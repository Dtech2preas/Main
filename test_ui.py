from playwright.sync_api import sync_playwright
import time

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Start a local server just to test
        import subprocess
        server = subprocess.Popen(["python3", "-m", "http.server", "8080"])
        time.sleep(2) # Give server time to start

        try:
            page.goto("http://localhost:8080/index.html")
            page.screenshot(path="index_screenshot.png")

            page.goto("http://localhost:8080/quote.html")
            page.screenshot(path="quote_screenshot.png")

            # Select some options to test dynamic JS
            page.select_option("#platformType", "1500")
            page.select_option("#pageSize", "300")
            page.check("input[data-name='Admin Panel / CMS']")
            page.screenshot(path="quote_with_options.png")

        finally:
            browser.close()
            server.terminate()

if __name__ == "__main__":
    verify_ui()
