export default function Loader(props: { show: boolean, small?: boolean }) {
    const { show, small } = props
    return (
        show &&
        <span className={`loader-inline ${small ? "small" : ""}`}></span>
    )
}