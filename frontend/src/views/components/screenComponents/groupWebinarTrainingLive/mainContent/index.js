import { Fragment } from "react";
import LiveHost from "views/components/shared/liveHost";
import LiveSession from "../liveSession";
import Comments from "../comments";
import Attendees from "views/components/shared/attendees";
const friends = [
  "https://media.licdn.com/dms/image/C4D03AQGg7qCuHavEdg/profile-displayphoto-shrink_200_200/0/1521010848026?e=1684972800&v=beta&t=dHLiCBHVZ8eXFgRx5RvfuTKIPuhhN0gf2q9cYsEivjU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgsqkHF5eNd4C0RVDrtlPZUWHlmWTTrZMpbB7KU9kHJ785LPLySvlLVslCoqCiVogkZE&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MIK6s--5K3qB5E9AZ2uYAeIiBLJ9tTyRgPpl2V5V0CtKluyaa2TpINXGn4nqhWZ1Cco&usqp=CAU",
  "https://www.theigc.org/sites/default/files/styles/max_325x325/public/2017/05/patrick-bayer-e1495025124363.jpg?itok=OgxUyLzL",
  "https://econ.duke.edu/sites/econ.duke.edu/files/styles/news_full_image/public/news-images/bayer3.238.259.s.jpg?itok=fpRACRB4",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU9B7jlhn6WB8alOdFH-ap8K1DqtC-IctmKlnpkDE8H2bpUGmt6MB4v5I2DQRYMfBGIUk&usqp=CAU",
  "https://i.pinimg.com/564x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
  "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  "https://pbs.twimg.com/profile_images/1559489510819479554/UCmSSTlG_400x400.jpg",
  "https://media.licdn.com/dms/image/C4D03AQGg7qCuHavEdg/profile-displayphoto-shrink_200_200/0/1521010848026?e=1684972800&v=beta&t=dHLiCBHVZ8eXFgRx5RvfuTKIPuhhN0gf2q9cYsEivjU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgsqkHF5eNd4C0RVDrtlPZUWHlmWTTrZMpbB7KU9kHJ785LPLySvlLVslCoqCiVogkZE&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MIK6s--5K3qB5E9AZ2uYAeIiBLJ9tTyRgPpl2V5V0CtKluyaa2TpINXGn4nqhWZ1Cco&usqp=CAU",
  "https://www.theigc.org/sites/default/files/styles/max_325x325/public/2017/05/patrick-bayer-e1495025124363.jpg?itok=OgxUyLzL",
  "https://econ.duke.edu/sites/econ.duke.edu/files/styles/news_full_image/public/news-images/bayer3.238.259.s.jpg?itok=fpRACRB4",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU9B7jlhn6WB8alOdFH-ap8K1DqtC-IctmKlnpkDE8H2bpUGmt6MB4v5I2DQRYMfBGIUk&usqp=CAU",
  "https://i.pinimg.com/564x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
  "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  "https://pbs.twimg.com/profile_images/1559489510819479554/UCmSSTlG_400x400.jpg",
  "https://media.licdn.com/dms/image/C4D03AQGg7qCuHavEdg/profile-displayphoto-shrink_200_200/0/1521010848026?e=1684972800&v=beta&t=dHLiCBHVZ8eXFgRx5RvfuTKIPuhhN0gf2q9cYsEivjU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgsqkHF5eNd4C0RVDrtlPZUWHlmWTTrZMpbB7KU9kHJ785LPLySvlLVslCoqCiVogkZE&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MIK6s--5K3qB5E9AZ2uYAeIiBLJ9tTyRgPpl2V5V0CtKluyaa2TpINXGn4nqhWZ1Cco&usqp=CAU",
  "https://www.theigc.org/sites/default/files/styles/max_325x325/public/2017/05/patrick-bayer-e1495025124363.jpg?itok=OgxUyLzL",
  "https://econ.duke.edu/sites/econ.duke.edu/files/styles/news_full_image/public/news-images/bayer3.238.259.s.jpg?itok=fpRACRB4",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU9B7jlhn6WB8alOdFH-ap8K1DqtC-IctmKlnpkDE8H2bpUGmt6MB4v5I2DQRYMfBGIUk&usqp=CAU",
  "https://i.pinimg.com/564x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
  "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  "https://pbs.twimg.com/profile_images/1559489510819479554/UCmSSTlG_400x400.jpg",
  "https://media.licdn.com/dms/image/C4D03AQGg7qCuHavEdg/profile-displayphoto-shrink_200_200/0/1521010848026?e=1684972800&v=beta&t=dHLiCBHVZ8eXFgRx5RvfuTKIPuhhN0gf2q9cYsEivjU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzgsqkHF5eNd4C0RVDrtlPZUWHlmWTTrZMpbB7KU9kHJ785LPLySvlLVslCoqCiVogkZE&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7MIK6s--5K3qB5E9AZ2uYAeIiBLJ9tTyRgPpl2V5V0CtKluyaa2TpINXGn4nqhWZ1Cco&usqp=CAU",
  "https://www.theigc.org/sites/default/files/styles/max_325x325/public/2017/05/patrick-bayer-e1495025124363.jpg?itok=OgxUyLzL",
  "https://econ.duke.edu/sites/econ.duke.edu/files/styles/news_full_image/public/news-images/bayer3.238.259.s.jpg?itok=fpRACRB4",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU9B7jlhn6WB8alOdFH-ap8K1DqtC-IctmKlnpkDE8H2bpUGmt6MB4v5I2DQRYMfBGIUk&usqp=CAU",
  "https://i.pinimg.com/564x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg",
  "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU",
  "https://pbs.twimg.com/profile_images/1559489510819479554/UCmSSTlG_400x400.jpg",
];

const MainContent = () => {
  const right = () => (
    <>
      <LiveHost
        heading="Live Host"
        name="Bella craig is live now"
        image="https://media.licdn.com/dms/image/C4D03AQGg7qCuHavEdg/profile-displayphoto-shrink_200_200/0/1521010848026?e=1684972800&v=beta&t=dHLiCBHVZ8eXFgRx5RvfuTKIPuhhN0gf2q9cYsEivjU"
      />
      <Attendees heading={"People on this live"} users={friends} />
      <Comments />
    </>
  );
  return (
    <Fragment>
      <div className="mx-auto xl:grid xl:grid-cols-7 px-3 lg:px-4 lg:gap-8">
        <div className="col-span-5">
          <div>
            <div className="xl:space-y-0 space-y-10 ">
              <aside className="xl:hidden space-y-6">{right()}</aside>
              <div>
                <LiveSession />
              </div>
            </div>
          </div>
        </div>
        <aside className="hidden xl:block col-span-2 space-y-6">
          {right()}
        </aside>
      </div>
    </Fragment>
  );
};
export default MainContent;
