import React, { useCallback, useEffect, useRef } from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote,
  Link, AlignLeft, AlignCenter, AlignRight,
  Undo, Redo, Code, Minus
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  minHeight?: string;
}

const ToolbarBtn = ({
  onClick, title, active = false, children
}: {
  onClick: () => void; title: string; active?: boolean; children: React.ReactNode;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`p-1.5 rounded transition-colors ${
      active
        ? "bg-[#002B49] text-white"
        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
    }`}
  >
    {children}
  </button>
);

const Divider = () => <div className="w-px h-5 bg-gray-300 mx-1" />;

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  minHeight = "220px"
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  // Sync value to editor DOM safely without disrupting cursor position while typing
  useEffect(() => {
    if (editorRef.current) {
      if (isInternalChange.current) {
        isInternalChange.current = false;
        return;
      }
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value]);

  const exec = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const insertLink = useCallback(() => {
    const url = window.prompt("Enter URL:", "https://");
    if (url) exec("createLink", url);
  }, [exec]);

  const insertHeading = useCallback((level: string) => {
    exec("formatBlock", level);
  }, [exec]);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#C5A059] bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
        {/* Undo/Redo */}
        <ToolbarBtn onClick={() => exec("undo")} title="Undo"><Undo size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("redo")} title="Redo"><Redo size={14} /></ToolbarBtn>
        <Divider />

        {/* Format */}
        <ToolbarBtn onClick={() => exec("bold")} title="Bold (Ctrl+B)"><Bold size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("italic")} title="Italic (Ctrl+I)"><Italic size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("underline")} title="Underline (Ctrl+U)"><Underline size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("strikeThrough")} title="Strikethrough"><Strikethrough size={14} /></ToolbarBtn>
        <Divider />

        {/* Headings */}
        <ToolbarBtn onClick={() => insertHeading("h1")} title="Heading 1"><Heading1 size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => insertHeading("h2")} title="Heading 2"><Heading2 size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => insertHeading("h3")} title="Heading 3"><Heading3 size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => insertHeading("p")} title="Paragraph">
          <span className="text-[11px] font-semibold px-0.5">P</span>
        </ToolbarBtn>
        <Divider />

        {/* Lists */}
        <ToolbarBtn onClick={() => exec("insertUnorderedList")} title="Bullet List"><List size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("insertOrderedList")} title="Numbered List"><ListOrdered size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("formatBlock", "blockquote")} title="Blockquote"><Quote size={14} /></ToolbarBtn>
        <Divider />

        {/* Alignment */}
        <ToolbarBtn onClick={() => exec("justifyLeft")} title="Align Left"><AlignLeft size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("justifyCenter")} title="Align Center"><AlignCenter size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("justifyRight")} title="Align Right"><AlignRight size={14} /></ToolbarBtn>
        <Divider />

        {/* Extras */}
        <ToolbarBtn onClick={insertLink} title="Insert Link"><Link size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("formatBlock", "pre")} title="Code Block"><Code size={14} /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("insertHorizontalRule")} title="Horizontal Rule"><Minus size={14} /></ToolbarBtn>
        <Divider />
        <ToolbarBtn onClick={() => exec("removeFormat")} title="Clear Formatting">
          <span className="text-[11px] font-bold px-0.5">Tx</span>
        </ToolbarBtn>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        style={{ minHeight }}
        className="
          px-4 py-3 text-sm text-gray-800 outline-none overflow-y-auto
          [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400
          [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-[#002B49] [&_h1]:mb-2 [&_h1]:mt-3
          [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#002B49] [&_h2]:mb-2 [&_h2]:mt-2
          [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mb-1 [&_h3]:mt-2
          [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-2
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-2
          [&_blockquote]:border-l-4 [&_blockquote]:border-[#C5A059] [&_blockquote]:pl-4
          [&_blockquote]:text-gray-600 [&_blockquote]:italic [&_blockquote]:my-2
          [&_pre]:bg-gray-100 [&_pre]:rounded [&_pre]:p-3 [&_pre]:font-mono [&_pre]:text-sm
          [&_a]:text-blue-600 [&_a]:underline [&_hr]:border-gray-300 [&_hr]:my-3
          focus:outline-none
        "
      />
    </div>
  );
}
