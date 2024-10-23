import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import parse, { HTMLReactParserOptions } from 'html-react-parser'

const YouTube = ({ youtubeSrc }: { youtubeSrc: string }): ReactJSXElement => {
  return (
    <div
      className="video"
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0,
      }}
    >
      {}
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        allowFullScreen
        src={youtubeSrc}
      />
    </div>
  )
}

interface HtmlParserProps {
  content: string
}

const HtmlParser: React.FC<HtmlParserProps> = ({ content }) => {
  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.name !== 'iframe') {
        return
      }
      // eslint-disable-next-line no-useless-escape
      const regex = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/
      if (domNode.name === 'iframe' && regex.test(domNode.attribs.src)) {
        return <YouTube youtubeSrc={domNode.attribs.src} />
      }
    },
  }
  return <>{parse(content, options)}</>
}

export default HtmlParser
