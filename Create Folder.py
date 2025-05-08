import os

def create_project_structure(base_dir="project-root"):
    # Define directory paths
    directories = [
        os.path.join(base_dir, "backend"),
        os.path.join(base_dir, "frontend", "src", "components"),
    ]

    # Define file paths
    files = [
        # Backend files
        os.path.join(base_dir, "backend", "app.py"),
        os.path.join(base_dir, "backend", "requirements.txt"),
        os.path.join(base_dir, "backend", ".env"),
        # Frontend files
        os.path.join(base_dir, "frontend", "package.json"),
        os.path.join(base_dir, "frontend", ".env"),
        os.path.join(base_dir, "frontend", "src", "App.js"),
        os.path.join(base_dir, "frontend", "src", "components", "PdfSummarizer.js"),
    ]

    # Create directories
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        print(f"Created directory: {directory}")

    # Create files
    for file_path in files:
        with open(file_path, "w") as f:
            pass  # Create empty file
        print(f"Created file: {file_path}")

    print("\nProject structure created successfully!")

if __name__ == "__main__":
    create_project_structure()