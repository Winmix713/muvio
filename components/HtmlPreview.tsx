type HtmlPreviewProps = {
  htmlContent: string
}

const HtmlPreview = ({ htmlContent }: HtmlPreviewProps) => {
  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <h3 className="text-lg font-medium mb-4">HTML Előnézet</h3>
      <div className="border border-border rounded-lg overflow-hidden h-[600px]">
        <iframe
          srcDoc={htmlContent}
          title="HTML Preview"
          className="w-full h-full bg-white"
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </div>
  )
}

export default HtmlPreview

