"use client";

export default function DetailPage() {

  return (  
    <div className="w-full h-screen bg-[#1A1A23] pt-[96px]">

        {/* company image and description section */}
        <div className="mx-[120px] flex flex-row">
            <div className="w-1/3 mr-[30px] pb-[20.25%] bg-white">
                {/* placeholder image */}
            </div>
            <div className="w-2/3 flex flex-col">
                <div className="mt-[45px] w-full flex flex-row">
                    {/* Company Name div */}
                    <div className="text-[#F6FF82] text-[32px] font-bold">Nike. Inc</div>
                    {/* link icon */}
                    <div className="w-[22px] h-[22px] bg-white my-auto ml-[8px] "></div>
                </div>
                {/* Company description */}
                <div className="mt-[15px] w-full text-[15px] text-white">
                    Lorem ipsum dolor sit amet consectetur. Bibendum tellus elit pellentesque in loboortis tellus est ac purus. Quisque id ut id donec turpis. Lorem ipsum dolor sit amet consectetur. Bibendum tellus elit pellentesque in loboortis tellus est ac purus. Quisque id ut id donec turpis.
                </div>
                {/* statisctics */}
                <div className="mt-auto ml-auto w-full text-[15px] font flex justify-end text-white text-center">
                    <div className="flex flex-col mr-[45px] ">
                        <div className="text-[15px]">Total Offers</div>
                        <div className="text-center text-[23px]">6</div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-[15px]">Up to</div>
                        <div className="text-[23px]">50% off</div>
                    </div>
                </div>  
            </div>
        </div>

        {/* discounts offered section */}
        <div className="mx-[120px] border-t-[2px] border-white mt-[50px] pt-[96px] pb-[72px]">
            <div className="flex flex-row w-full justify-between">
                <div className="text-[#F6FF82] text-[32px] font-bold mb-auto">Discounts Offered</div>
                <div className="flex flex-row text-white">
                    <div className="flex flex-col mr-[24px]">
                        <label>
                            <div>Sort By:</div>
                            <select className="p-[9px] rounded-[10px] border-[2px] border-[#8E94E9] bg-transparent mt-[8px]">
                                <option value="select">Select an option</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex flex-col ">
                        <label>
                            <div>Private Groups:</div>
                            <select className="p-[9px] rounded-[10px] border-[2px] border-[#8E94E9] bg-transparent mt-[8px]">
                                <option value="">Select an option</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        {/* discount listing section */}
        <div className="mx-[120px] flex flex-row relative">
            <div className="w-[20%] bg-[#8E94E9] text-white flex rounded-l-[25px]">
                <div className="text-[40px] font-bold w-[70px] m-auto">15% OFF</div>
            </div>
            <div className="w-[80%] px-[40px] py-[64px] bg-white flex justify-between rounded-r-[25px]">
                <div>
                    <div className="text-[24px] font-bold">Get 25% off for Shoes & Bags</div>
                    <div className="text-[14px]">*Terms & Conditions apply</div>
                    <div className="flex flex-row mt-[48px]">
                        <div className="h-[24px] w-[24px] rounded-[24px] border-black border-[2px] mr-[8px]"></div>
                        <div>by Darrell Steward</div>
                    </div>
                </div>
                <div className="flex h-auto my-auto">
                    <div className="h-[50px] w-[50px] rounded-[50px] border-black border-[2px] mr-[16px] my-auto"></div>
                    <div className="h-[50px] w-[50px] rounded-[50px] border-black border-[2px] mr-[16px] my-auto"></div>
                    <div className="h-[48px] w-[221px] rounded-[24px] border-black border-[2px]"></div>
                </div>
            </div>
        </div>

        {/* {myArray.map((item, index) => (
            <MyComponent key={index} item={item} />
        ))} */}
    </div>
  );
}
