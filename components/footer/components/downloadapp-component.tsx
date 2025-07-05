import Image from "next/image";
import { Link } from "@/i18n/routing";

const DownloadApp = () => {
  return (
    <>
         <Link href="/">
                      <Image
                        src={`/images/template/appstore.png`}
                        alt=""
                        width={200}
                        height={200}
                        className=""
                      />
                    </Link>
                    <Link href="/"  >
                      <Image
                        src={`/images/template/google-play.png`}
                        alt=""
                        width={200}
                        height={200}
                        className=""
                      />
                    </Link>
    </>
  )
}

export default DownloadApp