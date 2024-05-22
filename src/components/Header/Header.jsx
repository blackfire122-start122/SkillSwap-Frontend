import style from "../../styles/Header.module.css"
import ProfileLinks from "../../images/ProfileLinks";
import BestPerformers from "./BestPerformers";

function Header({user}) {
    return (
        <header className={style.header}>
            <div className={style.links}>
                {/*<img src={menuImg} alt="menu" onClick={}/>*/}
                <img className={style.logoImg} src="/logo.png" alt="logo"/>
                <ProfileLinks user={user} />
            </div>
            <h1 className={style.name}>SkillSwap</h1>
            <p className={style.description}><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias animi cupiditate doloremque enim eos eum expedita fuga labore maiores molestiae necessitatibus possimus praesentium quisquam, rem rerum sunt ullam vel!</span><span>A aut, culpa dolorum error expedita fugit illum iure omnis perspiciatis placeat, possimus quae qui sit unde vero! Blanditiis delectus dolorum eos error ipsa omnis, temporibus. Nulla placeat quisquam voluptatem.</span><span>A adipisci animi asperiores assumenda aut consequuntur corporis dolor enim, ex impedit inventore iure laudantium libero natus nemo non officiis omnis quae quas quibusdam ratione repellat saepe temporibus ut voluptas!</span><span>Ad alias facere hic ipsum modi nesciunt quaerat quos repellat velit? Aspernatur assumenda dicta dolor dolores, dolorum ducimus fuga inventore, nam natus necessitatibus nesciunt non nulla obcaecati quod sapiente tempora.</span></p>
            <BestPerformers/>
        </header>
    )
}

export default Header
