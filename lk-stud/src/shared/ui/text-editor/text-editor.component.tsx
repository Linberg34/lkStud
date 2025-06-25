import React, { useEffect, useRef } from 'react'
import {
    Bold,
    Underline,
    List,
    ListOrdered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Quote,
    Code,
    Link2,
    ChevronDown,
} from 'lucide-react'
import './text-editor.component.css'

const FONTS = ['Raleway', 'Roboto']

export const TextEditor: React.FC<{
    value: string
    onChange: (html: string) => void
}> = ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.execCommand('styleWithCSS', false, 'true')
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value
        }
    }, [value])

    const exec = (cmd: string, arg?: string) => {
        document.execCommand(cmd, false, arg)
        onChange(editorRef.current?.innerHTML || '')
        editorRef.current?.focus()
    }

    const handleInput = () => {
        onChange(editorRef.current?.innerHTML || '')
    }

    return (
        <div className="text-editor">
            <div className="text-editor__toolbar">
                <div className="text-editor__font-selector">
                    <span className="text-editor__T">T</span>
                    <select
                        className="text-editor__font-select"
                        onChange={(e) => exec('fontName', e.target.value)}
                    >
                        {FONTS.map((f) => (
                            <option key={f} value={f}>
                                {f}
                            </option>
                        ))}
                    </select>
                    <ChevronDown size={16} className="text-editor__dropdown-icon" />
                </div>
                <button onClick={() => exec('bold')} title="Bold">
                    <Bold size={16} />
                </button>
                <button onClick={() => exec('underline')} title="Underline">
                    <Underline size={16} />
                </button>
                <button onClick={() => exec('justifyLeft')} title="Align Left">
                    <AlignLeft size={16} />
                </button>
                <button onClick={() => exec('justifyCenter')} title="Align Center">
                    <AlignCenter size={16} />
                </button>
                <button onClick={() => exec('justifyRight')} title="Align Right">
                    <AlignRight size={16} />
                </button>
                <button onClick={() => exec('insertUnorderedList')} title="Bullet List">
                    <List size={16} />
                </button>
                <button onClick={() => exec('insertOrderedList')} title="Numbered List">
                    <ListOrdered size={16} />
                </button>
                <button onClick={() => exec('formatBlock', '<blockquote>')} title="Blockquote">
                    <Quote size={16} />
                </button>
                <button onClick={() => exec('formatBlock', '<pre>')} title="Code">
                    <Code size={16} />
                </button>
                <button
                    onClick={() => {
                        const url = prompt('Enter URL', 'https://') || ''
                        exec('createLink', url)
                    }}
                    title="Link"
                >
                    <Link2 size={16} />
                </button>
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
