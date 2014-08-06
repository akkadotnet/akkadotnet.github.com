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
    markdown = Redcarpet::Markdown.new(BootstrapTables, :tables => true)
    markdown.render(content)
  end
end
