import { withRouter } from 'next/router';

const ActiveLink = ({ router, href, children }) => {
    (function prefetchPages() {
        if (typeof window !== "undefined") {
            router.prefetch(router.asPath)
        }
    })()

    const handleClick = event => {
        event.preventDefault();
        router.push(href)
    }

    const isCurrentPath = router.asPath === href;

    return <div>
        <a
            href={href}
            onClick={handleClick}
            className={isCurrentPath ? "flex active-nav-link rounded-md opacity-100 m-3" : "flex m-3"}
        >
            {children}
        </a>
    </div>
};

export default withRouter(ActiveLink);