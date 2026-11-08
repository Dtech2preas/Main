import os
import sys
import time
import glob
import subprocess
from playwright.sync_api import sync_playwright

def smooth_scroll(page, start_y, end_y, step=30, delay=0.025):
    """Simulates smooth human scrolling between two vertical coordinates."""
    current = start_y
    if start_y < end_y:
        while current < end_y:
            current = min(current + step, end_y)
            page.evaluate(f"window.scrollTo(0, {current})")
            time.sleep(delay)
    else:
        while current > end_y:
            current = max(current - step, end_y)
            page.evaluate(f"window.scrollTo(0, {current})")
            time.sleep(delay)

def run_walkthrough():
    os.makedirs("output_videos", exist_ok=True)
    os.makedirs("screenshots", exist_ok=True)

    # Start local Python HTTP server
    server = subprocess.Popen([sys.executable, "-m", "http.server", "8080"])
    time.sleep(2)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(
                headless=True,
                args=[
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-dev-shm-usage"
                ]
            )

            # Record in crisp 720p HD (1280x720)
            context = browser.new_context(
                viewport={"width": 1280, "height": 720},
                record_video_dir="output_videos/",
                record_video_size={"width": 1280, "height": 720}
            )
            page = context.new_page()

            print("=== [1/5] Recording Homepage (index.html) ===")
            page.goto("http://localhost:8080/index.html", wait_until="networkidle")
            time.sleep(1.5)
            page.screenshot(path="screenshots/01_homepage_hero.png")

            # Smoothly scroll through services
            smooth_scroll(page, 0, 600, step=25, delay=0.03)
            time.sleep(1.2)
            page.screenshot(path="screenshots/02_services_tiers.png")

            # Scroll to licensing
            smooth_scroll(page, 600, 1300, step=35, delay=0.025)
            time.sleep(1.2)

            # Scroll to ecosystem & trust
            smooth_scroll(page, 1300, 1900, step=35, delay=0.025)
            time.sleep(1.0)

            # Scroll back up to tier cards
            smooth_scroll(page, 1900, 550, step=45, delay=0.02)
            time.sleep(0.8)

            # Click Level 2 Dynamic Website tier button
            print("=== [2/5] Navigating to Interactive Quote Estimator (quote.html) ===")
            page.click("a[href='quote.html?tier=2']")
            page.wait_for_load_state("networkidle")
            time.sleep(1.5)
            page.screenshot(path="screenshots/03_quote_initial.png")

            # Scroll down to configurator options
            smooth_scroll(page, 0, 350, step=25, delay=0.03)
            time.sleep(1.0)

            # Configure options in real-time
            # 1. Page volume: click 6-10 Pages
            page.click("#pageSelector .option-card[data-value='300']")
            time.sleep(0.8)

            # 2. Add-ons: Check Admin Dashboard / CMS
            page.check("input[data-name='Admin Dashboard / CMS']")
            time.sleep(0.8)

            # 3. Add-ons: Check E-Commerce & Online Pay
            page.check("input[data-name='E-Commerce & Online Pay']")
            time.sleep(0.8)

            # 4. Domain: Select .co.za domain
            page.click("#domainSelector .option-card[data-value='150']")
            time.sleep(0.8)

            # 5. Type project name
            project_input = page.locator("#projectNameInput")
            if project_input.is_visible():
                project_input.click()
                project_input.type("Apex Stores SA", delay=80)
                time.sleep(1.0)

            page.screenshot(path="screenshots/04_quote_configured.png")

            # Toggle the live breakdown drawer on the floating top estimate card
            toggle_btn = page.locator("#toggleDrawerBtn")
            if toggle_btn.is_visible():
                toggle_btn.click()
                time.sleep(2.0)
                page.screenshot(path="screenshots/05_quote_breakdown_drawer.png")
                toggle_btn.click()
                time.sleep(0.8)

            # Navigate to Digital Marketplace
            print("=== [3/5] Recording Marketplace (marketplace.html) ===")
            smooth_scroll(page, 350, 0, step=30, delay=0.02)
            time.sleep(0.6)
            try:
                page.click(".nav-desktop a[href='marketplace.html']")
            except Exception:
                page.goto("http://localhost:8080/marketplace.html")
            page.wait_for_load_state("networkidle")
            time.sleep(1.5)
            page.screenshot(path="screenshots/06_marketplace.png")
            smooth_scroll(page, 0, 700, step=30, delay=0.03)
            time.sleep(1.5)

            # Navigate to Ecosystem
            print("=== [4/5] Recording Ecosystem Map (ecosystem.html) ===")
            smooth_scroll(page, 700, 0, step=35, delay=0.02)
            time.sleep(0.6)
            try:
                page.click(".nav-desktop a[href='ecosystem.html']")
            except Exception:
                page.goto("http://localhost:8080/ecosystem.html")
            page.wait_for_load_state("networkidle")
            time.sleep(2.0)
            page.screenshot(path="screenshots/07_ecosystem_map.png")

            # Click central node to show interactive modal
            hub = page.locator("#dtech-hub")
            if hub.is_visible():
                hub.click()
                time.sleep(2.0)
                page.screenshot(path="screenshots/08_ecosystem_modal.png")
                # Close modal if close button present
                close_modal = page.locator("#missionModal button")
                if close_modal.is_visible():
                    close_modal.click()
                    time.sleep(1.0)

            # Navigate to Financials & Gateway
            print("=== [5/5] Recording Financials / Payment Gateway (payment.html) ===")
            page.goto("http://localhost:8080/payment.html", wait_until="networkidle")
            time.sleep(1.5)
            page.screenshot(path="screenshots/09_payment_gateway.png")

            # Type sample voucher code to demonstrate interaction
            voucher_input = page.locator("#voucherCode")
            if voucher_input.is_visible():
                voucher_input.click()
                voucher_input.type("DTECH-PROMO-2026", delay=90)
                time.sleep(2.0)

            # Final smooth wrap-up
            print("=== Walkthrough complete, saving video... ===")
            time.sleep(1.0)

            page.close()
            context.close()
            browser.close()

    finally:
        server.terminate()

    # Find the recorded webm file
    webm_files = glob.glob("output_videos/*.webm")
    if webm_files:
        latest_webm = max(webm_files, key=os.path.getctime)
        target_webm = "output_videos/dtech_walkthrough.webm"
        if latest_webm != target_webm:
            if os.path.exists(target_webm):
                os.remove(target_webm)
            os.rename(latest_webm, target_webm)
        print(f"Recorded video saved to: {target_webm} (Size: {os.path.getsize(target_webm)} bytes)")
    else:
        print("Warning: No webm file found in output_videos/")

if __name__ == "__main__":
    run_walkthrough()
