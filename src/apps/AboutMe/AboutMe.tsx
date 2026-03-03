import { useState, type ElementType } from 'react';
import './AboutMe.scss';
import { Profile } from './Profile';
import { Experience } from './Experience';
import { Education } from './Education';
import { Projects } from './Projects';

const tabs: Record<string, ElementType> = {
    "Profile": Profile,
    "Experience": Experience,
    "Education": Education,
    "Projects": Projects,
}

function AboutMe() {

    const [activeTab, setActiveTab] = useState("Profile");
    const ActiveContentComponent = tabs[activeTab];

    return (
        <div className='about-me_container'>
            <div className='about-me_side-panel'>
                {
                    Object.keys(tabs).map((tabName) => {
                        return (
                            <button
                                key={tabName}
                                className={`about-me_menu-button ${activeTab === tabName ? 'active' : ''}`}
                                onClick={() => setActiveTab(tabName)}
                            >
                                {tabName}
                            </button>
                        )
                    })
                }
            </div>

            <div className='about-me_content-area'>
                {ActiveContentComponent ? <ActiveContentComponent /> : null}
            </div>
        </div>
    )
}

export { AboutMe }
