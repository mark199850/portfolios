import ProfileIcon from './assets/profile.png'
import './Profile.scss';

export function Profile() {

    return (
        <div className='about-me_profile-page_container'>
            <div className='about-me_profile-page_card'>
                <div className='about-me_profile-page_profile-image_container' >
                    <img className='about-me_profile-page_profile-image' src={ProfileIcon} alt='' />
                </div>
                <div className='about-me_profile-page_profile-details_container'>
                    <h3 className='about-me_profile-page_label'>
                        Name:
                        <span>Pócs Márk</span>
                    </h3>
                    <h3 className='about-me_profile-page_label'>
                        Role:
                        <span>Software Developer</span>
                    </h3>
                    <h3 className='about-me_profile-page_label'>
                        Experience:
                        <span>2.5 years</span>
                    </h3>
                </div>
            </div>
            <p className='about-me_profile-page_description'>I am a software developer passionate about Linux, modern web technologies, and fluid user interfaces.
                I enjoy crafting seamless digital experiences that feel fast, intuitive, and alive.
                This Web OS is a personal project built to showcase my frontend architecture skills,
                attention to detail, and love for creating immersive UI systems.</p>
        </div>
    )
}
