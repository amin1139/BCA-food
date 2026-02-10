import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import react from "react"
import { MdEmail } from "react-icons/md";
import { DiHtml5 } from "react-icons/di";
// import User from "./User";

class AboutUs extends react.Component {
    constructor(props){
        super(props)
        this.state={
            userInfo:{},
            loading: true,
            error: null
        }
        console.log('parent constructor');
    }

    async componentDidMount(){
        
        try{
            const data = await fetch('https://api.github.com/users/amin1139')
            if (!data.ok) {
                throw new Error(`HTTP error! Status: ${data.status}`);
            }
            console.log(data);
            
            const json = await data.json()
            this.setState({
                userInfo: json,
                loading: false
            })
            console.log(json);
        } catch(error){
            console.log("Fetching error:", error);

            this.setState({
                loading: false,
                error: error.message
            })
        }
        
    }

    render(){
        console.log('parent render');
        const {userInfo, loading} = this.state

        const myInfo = {
            socialMedia: [
                {socialMediaName: 'Github', socialMediaIcon: <FaGithub/>},
                {socialMediaName: 'LinkedIn', socialMediaIcon: <FaLinkedin />},
                {socialMediaName: 'Email', socialMediaIcon: <MdEmail />},
            ],
            skill: ['HTML','CSS', 'Javascript', 'Tailwind', 'GitHub'],
            project: ['Swiggy Clone (React + API)', 'Netflix Clone', 'Youtube clone']
        }

        if(loading){
            return(
                <h1 className="text-4xl">LOADING...</h1>
            )
        }
        if (this.state.error) {
            return <h2 className="text-4xl">Error: {this.state.error}</h2>;
            
        }

        return(
            <>
                <div className="min-h-screen from-orange-50 to-white py-12 px-4">

                    <div className="max-w-6xl mx-auto">

                        {/* Top Card */}
                        <div className="bg-white shadow-xl rounded-2xl p-8">

                            <div className="flex flex-col md:flex-row items-center gap-10">

                                {/* Profile Image */}
                                <img
                                    src={userInfo.avatar_url}
                                    alt="profile"
                                    className="w-52 h-52 rounded-full object-cover border-4 border-orange-400 shadow-lg"
                                />

                                {/* Intro */}
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-800">
                                        {userInfo.name}
                                    </h1>

                                    <p className="text-orange-500 font-semibold mt-2">
                                        Frontend Developer | React Learner
                                    </p>

                                    {/* Social Buttons */}
                                    <div className="flex gap-4 mt-6">
                                        {myInfo.socialMedia.map((info, i)=>{
                                            return(
                                                <button key={i} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black">
                                                    {info.socialMediaIcon} {info.socialMediaName}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="mt-10 bg-white shadow-xl rounded-2xl p-8">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Skills</h2>

                            <div className="flex flex-wrap gap-4">
                                {myInfo.skill.map((skill,i)=>{
                                    return <span key={i}className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full flex item-center">{skill}</span>
                                })}
                                
                            </div>
                        </div>

                        {/* Projects Section */}
                        <div className="mt-10 bg-white shadow-xl rounded-2xl p-8">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Projects</h2>

                            <ul className="list-disc ml-6 text-gray-600 space-y-2">
                                {myInfo.project.map((projects,i)=>{
                                    return <li key={i}>{projects}</li>
                                })}
                            </ul>
                        </div>

                    </div>
                </div>
            </>
        )

    }
}
export default AboutUs