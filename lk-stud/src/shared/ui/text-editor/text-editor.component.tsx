import React, { useEffect, useRef } from 'react'
import './text-editor.component.css'

interface TextEditorProps {
    value: string
    onChange: (html: string) => void
}

export const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value
        }
    }, [value])

    const exec = (command: string, arg?: string) => {
        document.execCommand(command, false, arg)
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML)
        }
        editorRef.current?.focus()
    }

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML)
        }
    }

    return (
        <div className="text-editor">
            <div className="text-editor__toolbar">
                <button type="button" onClick={() => exec('bold')}><b>B</b></button>
                <button type="button" onClick={() => exec('italic')}><i>I</i></button>
                <button type="button" onClick={() => exec('underline')}><u>U</u></button>
                <button type="button" onClick={() => exec('insertUnorderedList')}>• List</button>
                <button type="button" onClick={() => exec('insertOrderedList')}>1. List</button>
                <button type="button" onClick={() => {
                    const url = prompt('Enter URL', 'https://') || '';
                    exec('createLink', url)
                }}>Link</button>
            </div>
            <div
                ref={editorRef}
                className="text-editor__content"
                contentEditable
                onInput={handleInput}
                data-placeholder="Enter text here..."
            />
        </div>
    )
}