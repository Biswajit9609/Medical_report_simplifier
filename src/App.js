import React, { useState, useRef } from 'react';
import { Upload, FileText, Brain, AlertCircle, CheckCircle, X } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setError('');
    setSuccess(false);
    setAnalysis('');

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.onerror = () => setError('Failed to read file');
    reader.readAsDataURL(file);
  };

  const analyzeReport = async () => {
    if (!selectedFile) {
      setError('Please select a medical report image');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);
    setAnalysis('');

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const base64 = e.target.result.split(',')[1];
        
        const response = await fetch(process.env.REACT_APP_API_URL || '/caption', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({ imageBase64: base64 })
        });

        if (!response.ok) {
          throw new Error(`Analysis failed: ${response.status}`);
        }

        const result = await response.json();
        const markdown = result.caption || 'No analysis generated';
        const sanitizedHtml = DOMPurify.sanitize(marked.parse(markdown));
        
        setAnalysis(sanitizedHtml);
        setSuccess(true);
      } catch (err) {
        setError(err.message || 'Failed to analyze report');
      } finally {
        setLoading(false);
      }
    };
    
    reader.onerror = () => {
      setError('Failed to read file');
      setLoading(false);
    };
    
    reader.readAsDataURL(selectedFile);
  };

  const clearAll = () => {
    setSelectedFile(null);
    setPreview('');
    setAnalysis('');
    setError('');
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-content">
            <div className="header-icon">
              <FileText size={32} />
            </div>
            <div>
              <h1>Medical Report Assistant</h1>
              <p>AI-powered medical report analysis and simplification</p>
            </div>
          </div>
        </header>

        <div className="upload-section">
          <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
            <Upload size={48} />
            <h3>Upload Medical Report</h3>
            <p>Click to select or drag and drop your medical report image</p>
            <span className="file-types">Supports: JPG, PNG, PDF images</span>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="file-input"
          />
        </div>

        {error && (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
            <button onClick={() => setError('')} className="alert-close">
              <X size={16} />
            </button>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <CheckCircle size={20} />
            <span>Report analyzed successfully!</span>
          </div>
        )}

        {selectedFile && (
          <div className="file-info">
            <div className="file-details">
              <FileText size={20} />
              <div>
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button onClick={clearAll} className="btn-clear">
              Clear
            </button>
          </div>
        )}

        {preview && (
          <div className="preview-section">
            <h3>Preview</h3>
            <img src={preview} alt="Medical report preview" className="preview-image" />
          </div>
        )}

        <div className="action-section">
          <button
            onClick={analyzeReport}
            disabled={!selectedFile || loading}
            className="btn-analyze"
          >
            {loading ? (
              <>
                <Brain className="spinning" size={20} />
                Analyzing Report...
              </>
            ) : (
              <>
                <Brain size={20} />
                Analyze Report
              </>
            )}
          </button>
        </div>

        {loading && (
          <div className="loading-screen">
            <div className="loading-content">
              <div className="loading-spinner">
                <Brain className="spinning" size={48} />
              </div>
              <h3>Analyzing Your Medical Report</h3>
              <p>Our AI is carefully reviewing your report to provide a simplified summary...</p>
              <div className="loading-progress">
                <div className="progress-bar"></div>
              </div>
            </div>
          </div>
        )}

        {analysis && !loading && (
          <div className="analysis-section">
            <div className="analysis-header">
              <h2>Simplified Report Summary</h2>
              <div className="analysis-badge">AI Simplified</div>
            </div>
            <div 
              className="analysis-content"
              dangerouslySetInnerHTML={{ __html: analysis }}
            />
            <div className="analysis-footer">
              <p>
                <strong>Disclaimer:</strong> This simplified summary is AI-generated and should not replace professional medical advice. 
                Always consult with healthcare professionals for medical decisions.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;