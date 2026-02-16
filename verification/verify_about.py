from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Go to the local server
    page.goto("http://localhost:8080/about.html")

    # Wait for the page to load
    page.wait_for_load_state("networkidle")

    # Verify specific text elements are present
    assert page.get_by_text("DTECH is a South Africa–based ecosystem").is_visible()
    assert page.get_by_role("heading", name="A Network of Connected Platforms").is_visible()
    assert page.get_by_role("heading", name="A Realistic Roadmap").is_visible()
    assert page.get_by_role("heading", name="Design Philosophy").is_visible()
    assert page.get_by_role("heading", name="Our Origins").is_visible()
    assert page.get_by_role("heading", name="Common Principles").is_visible()
    assert page.get_by_role("heading", name="Community & Collaboration").is_visible()

    # Take a full page screenshot
    page.screenshot(path="verification/about_page_full.png", full_page=True)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
