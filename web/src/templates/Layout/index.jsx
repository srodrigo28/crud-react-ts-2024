
import { Menu } from './../Menu'

export function Layout(props){
    return(
        <div className="">
            <Menu />
            <div className="container mx-auto px-4 py-8">
                {props.children}
                <h3>Layout Hello</h3>
            </div>
        </div>
    )
}