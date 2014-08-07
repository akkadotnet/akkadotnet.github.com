# Create a custom renderer that set the Bootstrap css class ".table" in the html table tag.
require 'jekyll'
require 'redcarpet'

class BootstrapTables < Redcarpet::Render::HTML
  def table(header, body)
    "\n<table class='table'><thead>\n#{ header }</thead><tbody>\n#{ body }</tbody></table>\n"
  end
end

class Jekyll::Converters::Markdown::RedcarpetMod
  def initialize(config)
    @site_config = config
  end

  def convert(content)
    
    extensions = {
      fenced_code_blocks: true,
      no_intra_emphasis: 	true,
      autolink:         	true,
      superscript:     		true,
      tables: 			      true,
      strikethrough:		  true,
      with_toc_data:		  true
    }

    markdown = Redcarpet::Markdown.new(BootstrapTables, extensions)
    markdown.render(content)
  end
end
