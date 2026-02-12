import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import React from "react";
import { MdEmail } from "react-icons/md";

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            loading: true,
            error: null
        };
    }

    async componentDidMount() {

        try {
            const data = await fetch("https://api.github.com/users/amin1139");
            if (!data.ok) {
                throw new Error(`HTTP error! Status: ${data.status}`);
            }

            const json = await data.json();
            this.setState({
                userInfo: json,
                loading: false
            });
        } catch (error) {
            this.setState({
                loading: false,
                error: error.message
            });
        }

    }

    render() {
        const { userInfo, loading } = this.state;

        const myInfo = {
            socialMedia: [
                { socialMediaName: "Github", socialMediaIcon: <FaGithub /> },
                { socialMediaName: "LinkedIn", socialMediaIcon: <FaLinkedin /> },
                { socialMediaName: "Email", socialMediaIcon: <MdEmail /> },
            ],
            skill: ["HTML", "CSS", "Javascript", "Tailwind", "GitHub"],
            project: ["Swiggy Clone (React + API)", "Netflix Clone", "Youtube clone"]
        };

        if (loading) {
            return (
                <h1 className="px-6 py-10 text-4xl text-gray-800 dark:text-slate-100">LOADING...</h1>
            );
        }
        if (this.state.error) {
            return <h2 className="px-6 py-10 text-4xl text-red-600 dark:text-red-400">Error: {this.state.error}</h2>;

        }

        return (
            <>
                <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 dark:from-slate-900 dark:to-slate-800">

                    <div className="max-w-6xl mx-auto">

                        {/* Top Card */}
                        <div className="bg-white shadow-xl rounded-2xl p-8 dark:bg-slate-800 dark:shadow-black/40">

                            <div className="flex flex-col md:flex-row items-center gap-10">

                                {/* Profile Image */}
                                <img
                                    src={userInfo.avatar_url}
                                    alt="profile"
                                    className="w-52 h-52 rounded-full object-cover border-4 border-orange-400 shadow-lg"
                                />

                                {/* Intro */}
                                <div>
                                    <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-100">
                                        {userInfo.name}
                                    </h1>

                                    <p className="text-orange-500 font-semibold mt-2">
                                        Frontend Developer | React Learner
                                    </p>

                                    {/* Social Buttons */}
                                    <div className="flex gap-4 mt-6">
                                        {myInfo.socialMedia.map((info, i) => {
                                            return (
                                                <button key={i} className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-black dark:bg-slate-700 dark:hover:bg-slate-600">
                                                    {info.socialMediaIcon} {info.socialMediaName}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="mt-10 bg-white shadow-xl rounded-2xl p-8 dark:bg-slate-800 dark:shadow-black/40">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-slate-100">Skills</h2>

                            <div className="flex flex-wrap gap-4">
                                {myInfo.skill.map((skill, i) => {
                                    return <span key={i} className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full flex item-center dark:bg-orange-950 dark:text-orange-300">{skill}</span>;
                                })}

                            </div>
                        </div>

                        {/* Projects Section */}
                        <div className="mt-10 bg-white shadow-xl rounded-2xl p-8 dark:bg-slate-800 dark:shadow-black/40">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-slate-100">Projects</h2>

                            <ul className="list-disc ml-6 text-gray-600 space-y-2 dark:text-slate-300">
                                {myInfo.project.map((projects, i) => {
                                    return <li key={i}>{projects}</li>;
                                })}
                            </ul>
                        </div>

                    </div>
                </div>
            </>
        );

    }
}
export default AboutUs;
