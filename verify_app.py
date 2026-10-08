from playwright.sync_api import sync_playwright

def run_verification(page):
    page.goto("http://localhost:8000/index.html")
    page.wait_for_timeout(1000)

    # 1. Select Harmonic Minor family and Phrygian Dominant mode
    page.select_option("#select-family", "harmonic_minor")
    page.wait_for_timeout(500)

    page.select_option("#select-mode", "4") # Mode 5: Frigio Dominante
    page.wait_for_timeout(500)

    # 2. Select 8 strings
    page.select_option("#select-strings", "8")
    page.wait_for_timeout(500)

    # 3. Change root note to E
    page.select_option("#select-root", "E")
    page.wait_for_timeout(500)

    # Take screenshot of updated layout
    page.screenshot(path="/home/jules/verification/screenshots/verification.png")
    page.wait_for_timeout(1000)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos"
        )
        page = context.new_page()
        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
