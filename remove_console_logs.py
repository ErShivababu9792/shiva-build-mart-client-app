import re
from pathlib import Path

root = Path('src')
pattern = re.compile(r'(^|\r?\n)[ \t]*console\.(log|error|warn|debug)\([^\n]*?\);?')

count = 0
for path in root.rglob('*'):
    if path.suffix in {'.js', '.jsx'}:
        text = path.read_text(encoding='utf8')
        new = pattern.sub(lambda m: m.group(1), text)
        if new != text:
            path.write_text(new, encoding='utf8')
            print('Cleaned', path)
            count += 1
print(f'Removed console statements from {count} files')
