import re

with open('index.html', 'r') as f:
    content = f.read()

# Fix the anchor tags in the monthly support section to have margin-top: auto
# It looks like they already have width: 100%, etc.
content = re.sub(r'(<a href="contact.html"[^>]*?)>', r'\1 margin-top: auto;">', content)

with open('index.html', 'w') as f:
    f.write(content)
