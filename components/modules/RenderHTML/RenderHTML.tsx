import styles from './RenderHTML.module.css'

export default function RenderHTML({ html }: { html: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html
      }}
      className={styles.content}
    ></div>
  )
}
