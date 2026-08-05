import re

with open("css/style.css", "r") as f:
    content = f.read()

# Make the container wider. It currently is 1200px or similar.
# Let's change --container-width to 98% or something, or change the max-width of container.
content = re.sub(r'(--container-width:\s*)1200px', r'\g<1>1400px', content)
content = re.sub(r'(\.container\s*\{[^}]*max-width:\s*)var\(--container-width\)', r'\g<1>95%', content)
content = re.sub(r'(\.container\s*\{[^}]*width:\s*)100%', r'\g<1>98%', content)

# Modify auto-grid min-width
# grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
# Let's change 300px to 400px so cards are wider on desktop, which reduces height.
content = re.sub(r'(grid-template-columns:\s*repeat\(auto-fit,\s*minmax\()300px', r'\g<1>400px', content)

# Make sure .card has flex column to push button to bottom
card_css = r'''
.card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border: 1px solid var(--border-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}
'''
content = re.sub(r'\.card\s*\{[^}]*\}', card_css.strip(), content)

with open("css/style.css", "w") as f:
    f.write(content)
