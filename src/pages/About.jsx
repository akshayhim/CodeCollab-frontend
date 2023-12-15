import { FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
// import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-[400px] flex items-center">
      <div className="max-w-[600px] rounded-lg p-5 border border-black mx-auto flex flex-col leading-10 font-medium">
        <div>Developed & Maintained by : Akshay Himatsingka</div>
        <div>
          Contribute to this project here :{" "}
          <span className="underline">
            {/* <a href="https://shorturl.at/mtEMZ" target="_blank"> */}
            <a
              href="https://shorturl.at/mtEMZ"
              target="_blank"
              rel="noreferrer"
            >
              Github Repo
            </a>
            Github Repo
            {/* </a> */}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Contact me:</span>
          <span className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
              <a
                href="mailto:akshayhimat@gmail.com"
                target="_blank"
                rel="noreferrer"
              >
                <BiLogoGmail size={20} />
              </a>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
              <a
                href="https://github.com/akshayhim"
                target="_blank"
                rel="noreferrer"
              >
                <AiFillGithub size={20} />
              </a>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
              <a
                href="https://www.linkedin.com/in/akshay-himatsingka/"
                target="-blank"
                rel="noreferrer"
              >
                <AiFillLinkedin size={20} />
              </a>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
              <a
                href="https://www.instagram.com/_akshay.h/"
                target="-blank"
                rel="noreferrer"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
