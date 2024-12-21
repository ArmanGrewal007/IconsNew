import os
import re
import glob

def add_title_to_svg(file_path):
    basename = os.path.splitext(os.path.basename(file_path))[0]
    basename = re.sub(r'-(?:Light|Dark)$', '', basename)
    
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = re.sub(r'<title>.*?</title>\s*', '', content)  # remove exisiting title
    title_element = f'<title>{basename}</title>'             # add new title
    content = re.sub(r'(<svg[^>]*>)', rf'\1\n    {title_element}', content)    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def process_svg_files(directory='.'):
    svg_files = glob.glob(os.path.join(directory, '*.svg'))
    
    for svg_file in svg_files:
        print(f"Processing: {svg_file}")
        try:
            add_title_to_svg(svg_file)
            print(f"Added title to: {svg_file}")
        except Exception as e:
            print(f"Error processing {svg_file}: {str(e)}")

if __name__ == "__main__":
    process_svg_files(directory="./public/icons")
    print("All SVG files processed successfully!")