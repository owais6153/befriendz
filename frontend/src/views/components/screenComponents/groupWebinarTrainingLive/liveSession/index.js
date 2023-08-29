import { Fragment } from "react";

const LiveSession = () => {
  return (
    <Fragment>
      <div className="bg-white rounded-2xl p-2">
        <div className="h-[776px] w-full flex justify-center rounded-full lg:aspect-video aspect-square">
          <video
            controls
            autoPlay
            loop
            muted
            className="object-cover w-full rounded-2xl "
            poster="https://v4.cdnpk.net/videvo_files/video/free/video0466/thumbnails/_import_614ef4f7dbaee9.04207792_large.jpg"
            disablePictureInPicture
          >
            <source
              src="https://v4.cdnpk.net/videvo_files/video/free/video0466/large_watermarked/_import_614ef4f7dbaee9.04207792_FPpreview.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </Fragment>
  );
};

export default LiveSession;
