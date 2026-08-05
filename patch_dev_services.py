import re

with open('index.html', 'r') as f:
    content = f.read()

# Replace min-height in paragraphs and lists
content = re.sub(r'min-height:\s*\d+px;\s*', '', content)

# Level 1
l1_desc = "Perfect for portfolios, churches, small businesses, NGOs, and personal websites."
l1_deliv = "2 - 5 days"
content = re.sub(
    r'(<h3>Level 1 – Static Website</h3>\s*<p[^>]*>).*?(</p>)',
    rf'\g<1>{l1_desc}\g<2>',
    content
)
# Insert delivery time
content = re.sub(
    r'(<div style="font-weight: 700; color: var\(--text-main\); margin-bottom: 1.5rem; font-size: 1.1rem;">Starting From <span style="color: var\(--primary\);">R500</span> <span style="font-size: 0.85rem; font-weight: normal; color: var\(--text-muted\);">once off</span></div>)',
    rf'\g<1>\n                    <div style="font-weight: 600; color: var(--text-main); margin-bottom: 1.5rem; font-size: 0.95rem;">Estimated Delivery: <span style="color: var(--text-muted); font-weight: normal;">{l1_deliv}</span></div>',
    content
)

# Level 2
l2_desc = "Ideal for businesses, schools, organisations, and clubs that need to manage content or users."
l2_deliv = "3 - 5 days"
content = re.sub(
    r'(<h3>Level 2 – Dynamic Website</h3>\s*<p[^>]*>).*?(</p>)',
    rf'\g<1>{l2_desc}\g<2>',
    content
)
content = re.sub(
    r'(<div style="font-weight: 700; color: var\(--text-main\); margin-bottom: 1.5rem; font-size: 1.1rem;">Starting From <span style="color: var\(--primary\);">R1,500</span> <span style="font-size: 0.85rem; font-weight: normal; color: var\(--text-muted\);">once off</span></div>)',
    rf'\g<1>\n                    <div style="font-weight: 600; color: var(--text-main); margin-bottom: 1.5rem; font-size: 0.95rem;">Estimated Delivery: <span style="color: var(--text-muted); font-weight: normal;">{l2_deliv}</span></div>',
    content
)

# Level 3
l3_desc = "Designed for organisations that need custom workflows, automation, and online services."
l3_deliv = "3 - 7 days"
content = re.sub(
    r'(<h3>Level 3 – Web Application</h3>\s*<p[^>]*>).*?(</p>)',
    rf'\g<1>{l3_desc}\g<2>',
    content
)
content = re.sub(
    r'(<div style="font-weight: 700; color: var\(--text-main\); margin-bottom: 1.5rem; font-size: 1.1rem;">Starting From <span style="color: var\(--primary\);">R3,000</span> <span style="font-size: 0.85rem; font-weight: normal; color: var\(--text-muted\);">once off</span></div>)',
    rf'\g<1>\n                    <div style="font-weight: 600; color: var(--text-main); margin-bottom: 1.5rem; font-size: 0.95rem;">Estimated Delivery: <span style="color: var(--text-muted); font-weight: normal;">{l3_deliv}</span></div>',
    content
)

# Level 4
l4_desc = "Built for large organisations requiring scalable infrastructure, advanced security, and custom integrations."
l4_deliv = "1 week - a month"
content = re.sub(
    r'(<h3>Level 4 – Enterprise Platform</h3>\s*<p[^>]*>).*?(</p>)',
    rf'\g<1>{l4_desc}\g<2>',
    content
)
content = re.sub(
    r'(<div style="font-weight: 700; color: var\(--text-main\); margin-bottom: 1.5rem; font-size: 1.1rem;">Custom Quote <span style="font-size: 0.85rem; font-weight: normal; color: var\(--text-muted\);">negotiable</span></div>)',
    rf'\g<1>\n                    <div style="font-weight: 600; color: var(--text-main); margin-bottom: 1.5rem; font-size: 0.95rem;">Estimated Delivery: <span style="color: var(--text-muted); font-weight: normal;">{l4_deliv}</span></div>',
    content
)

# Set margin-top: auto on request quote buttons
content = re.sub(r'(<a href="https://wa.me/[^"]+" target="_blank" class="btn btn-primary" style="width: 100%;)">', r'\1 margin-top: auto;">', content)

# Update the WhatsApp href templates to include estimated delivery time for Development Services
# E.g.
# %0AEstimated%20Delivery%3A%202%20-%205%20days%0A

import urllib.parse
def update_whatsapp(match):
    url = match.group(1)

    # We only want to update the dev service cards. Let's look for Level 1, Level 2, etc. in the URL
    if "Level%201" in url:
        deliv = "2 - 5 days"
    elif "Level%202" in url:
        deliv = "3 - 5 days"
    elif "Level%203" in url:
        deliv = "3 - 7 days"
    elif "Level%204" in url:
        deliv = "1 week - a month"
    else:
        return match.group(0)

    # Insert delivery time after Price
    # Price is %0AStarting%20Price%3A%20R500%0A for example
    # We can match %0AStarting%20Price%3A.*?%0A

    url = re.sub(r'(%0AStarting%20Price%3A.*?%0A)', rf'\1%0AEstimated%20Delivery%3A%20{urllib.parse.quote(deliv)}%0A', url)
    return f'href="{url}"'

content = re.sub(r'href="(https://wa.me/[^"]+)"', update_whatsapp, content)

with open('index.html', 'w') as f:
    f.write(content)
