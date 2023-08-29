import { Images } from "config/images";

const { shoppingCartIcon } = Images;
const tempPostData = {
  coverImage:
    "https://musicindustryhowtoimages.s3.amazonaws.com/wp-content/uploads/2018/04/11123809/The-best-online-guitar-lessons-for-beginners-compared.jpg",
  title:
    "Ultimate Guide For Beginners looking to play guitar like a Pro in 6 weeks",
  tags: ["beginner", "music", "guitar"],
  content: `
    <div>
      <p className="text-[14px] text-[#949494] font-openSans_regular mt-[20px]">
        Lorem ipsum dolor sit amet consectetur. Laoreet odio urna donec nibh.
        Justo velit netus ut nam. Purus turpis blandit non neque non fusce in
        eget. Nulla ornare non ornare varius pellentesque non. Aliquam leo
        ullamcorper lectus vitae mauris non. Massa eu ullamcorper ut enim odio
        turpis quis diam. Pellentesque risus aenean a sit. Id enim id aliquam
        pulvinar.
      </p>
      <p className="text-[14px] text-[#949494] font-openSans_regular mt-[20px]">
        Gravida enim sed at massa. Mi volutpat pharetra rhoncus nunc. At a ipsum
        mattis sit. Nunc tempus tincidunt turpis diam nibh tellus iaculis ipsum
        sed. Tincidunt sollicitudin ac in convallis diam. Pellentesque odio id
        cursus nunc tellus. Ac suspendisse sit commodo neque lacus cras. Tellus
        ultrices tellus magnis urna. Lectus sit ipsum nec eget rhoncus viverra
        sagittis. Viverra sed purus lacus in velit erat quis eget.
      </p>
      <p className="text-[14px] text-[#949494] font-openSans_regular mt-[20px]">
        Aenean a euismod dictumst magna lectus eleifend aliquam. Lectus magna
        pellentesque et nec netus integer felis pretium sed. Morbi orci ornare
        posuere non arcu placerat vitae. Eu sed vitae phasellus.
      </p>
    </div>
  `,
};
const Post = (props) => {
  const { postDetails } = props;

  const data = postDetails ? postDetails : tempPostData;
  return (
    <section className="bg-white rounded-2xl">
      <div>
        <div className="min-h-[547px] flex justify-center items-center rounded-full">
          <img
            className="object-contain"
            src="https://c.shld.net/rpx/i/s/i/spin/10167833/prod_19782326212?hei=350&wid=350&op_sharpen=1"
          />
        </div>

        <div className="px-10 py-5 border-t border-[#F5F5F5]">
          <div className="w-full">
            <div className="">
              <h1 className="text-[26px] font-openSans_bold text-[#515165] flex w-full items-center justify-between">
                <span>Air Fryer</span>
                <span className="text-[#FD6769]">$20.99</span>
              </h1>
            </div>

            <div>
              <p className="text-[14px] text-[#949494] font-openSans_regular mt-[20px]">
                Lorem ipsum dolor sit amet consectetur. Laoreet odio urna donec
                nibh. Justo velit netus ut nam. Purus turpis blandit non neque
                non fusce in eget. Nulla ornare non ornare varius pellentesque
                non. Aliquam leo ullamcorper lectus vitae mauris non. Massa eu
                ullamcorper ut enim odio turpis quis diam. Pellentesque risus
                aenean a sit. Id enim id aliquam pulvinar. .
              </p>
            </div>
            <div className="mt-[15px] flex justify-end flex-wrap">
              <button
                type="button"
                className="inline-flex justify-center items-center rounded-md bg-c_0493A3 py-[8px] px-[30px] text-[12px] font-openSans_semiBold text-white focus-visible:outline-none hover:brightness-110 min-h-[52px] space-x-2"
              >
                <span>
                  <img src={shoppingCartIcon.default} />
                </span>
                <span>Add To Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
