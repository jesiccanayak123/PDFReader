import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI  # Changed import
from PyPDF2 import PdfReader
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client with API key
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))  # New client initialization


def extract_text_from_pdf(pdf_file):
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text


def generate_summary(text):
    # Updated chat completion syntax
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that summarizes text."},
            {"role": "user", "content": f"Summarize the following text concisely:\n\n{text}"}
        ]
    )
    # Updated response access
    return response.choices[0].message.content.strip()  # Changed access to .content



@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.pdf'):
        try:
            extracted_text = extract_text_from_pdf(file)
            summary = generate_summary(extracted_text[:3000])
            return jsonify({
                "summary": summary,
                "extracted_text": extracted_text  # Add this line
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return jsonify({"error": "Invalid file format"}), 400




if __name__ == '__main__':
    app.run(debug=True)