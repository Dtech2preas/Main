import re

with open('index.html', 'r') as f:
    content = f.read()

def inject_delivery(match):
    before_div = match.group(1)

    # Check if this card is the Quiz/Learning Platform by checking if it contains 'D-TECH Learning Platform'
    # Since we are matching line by line, let's just find where we are. We are replacing the div with R 1,200 /year etc.
    # We will inject the delivery before the display:flex div.

    return before_div

# Actually, the easiest way to inject it is before the action buttons div: <div style="display: flex; gap: 0.5rem; flex-direction: column;">
# We need to distinguish between learning platform and others.
content_parts = content.split('<!-- Product 1: University Eligibility Checker -->')
top = content_parts[0]
rest = '<!-- Product 1: University Eligibility Checker -->' + content_parts[1]

products = rest.split('<!-- Product')
new_products = []
new_products.append(products[0])

for p in products[1:]:
    if 'Learning Platform' in p:
        deliv = "1 week - 3 weeks"
    else:
        deliv = "3 - 5 days"

    # Insert before <div style="display: flex; gap: 0.5rem; flex-direction: column;">
    p = p.replace(
        '<div style="display: flex; gap: 0.5rem; flex-direction: column;">',
        f'<div style="font-weight: 600; color: var(--text-main); margin-bottom: 1.5rem; font-size: 0.95rem;">Estimated Delivery: <span style="color: var(--text-muted); font-weight: normal;">{deliv}</span></div>\n                    <div style="display: flex; gap: 0.5rem; flex-direction: column; margin-top: auto;">'
    )
    new_products.append('<!-- Product' + p)

content = top + "".join(new_products)


with open('index.html', 'w') as f:
    f.write(content)
