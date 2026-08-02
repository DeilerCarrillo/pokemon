import NavLink from "./NavLinks";
import { Show, SignInButton, SignUpButton, UserAvatar, UserButton } from '@clerk/react'



const Nav = ({
    links
}) => {
    return (
        <nav className="nav-root">
            <ul className="nav-list">
                {(links ?? []).map((o) => {
                    return (<NavLink
                        key={o.text}
                        text={o.text}
                        to={o.to}
                        classNames={o.classNames ?? []} />);
                })}
                <Show when="signed-out">
                    <li>
                        <SignInButton>
                            <button class="nav-link">SignIn</button>
                        </SignInButton>
                    </li>
                    <li><SignUpButton>
                        <button class="nav-link">SignUp</button>
                    </SignUpButton>
                    </li>
                </Show>
                <Show when="signed-in">
                    <li>
                        <span className="nav-link">
                            <UserButton></UserButton>
                        </span>
                    </li>
                </Show>
            </ul>
        </nav>
    );
}

export default Nav;