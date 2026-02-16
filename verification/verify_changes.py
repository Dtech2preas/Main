from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the local index.html file
        cwd = os.getcwd()
        file_path = f"file://{cwd}/index.html"
        print(f"Loading {file_path}")
        page.goto(file_path)

        # Verify Core Focus Section
        print("Verifying Core Focus Section...")
        core_section = page.locator("#focus")
        if core_section.is_visible():
            print("Core Focus section is visible.")
            # Verify the list items
            items = ["Practical Tools", "Community-Oriented", "Accessible Tech", "Digital Support", "User-Friendly Platforms"]
            for item in items:
                if page.get_by_text(item).is_visible():
                    print(f" - Found item: {item}")
                else:
                    print(f" - MISSING item: {item}")

            # Take screenshot of Core Focus
            page.locator("#focus").screenshot(path="verification/core_focus.png")
            print("Saved verification/core_focus.png")
        else:
            print("Core Focus section not found!")

        # Verify Founder Section
        print("Verifying Founder Section...")
        # Scroll down to ensure it's rendered if lazy loading is involved (though it's static)
        founder_content = page.locator(".founder-content")
        if founder_content.is_visible():
            print("Founder content is visible.")
            # Verify the new text
            new_text_snippet = "Seakwa Jonas Mochebane, the visionary founder"
            if page.get_by_text(new_text_snippet).is_visible():
                print(" - Found new founder bio text.")
            else:
                print(" - MISSING new founder bio text.")

            # Take screenshot of Founder section
            # The wrapper includes the image, so let's screenshot the wrapper
            page.locator(".founder-wrapper").screenshot(path="verification/founder_section.png")
            print("Saved verification/founder_section.png")
        else:
            print("Founder content not found!")

        browser.close()

if __name__ == "__main__":
    run()
