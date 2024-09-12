import Navbar from '@/components/Navbar';
// import Wrapper from '@/components/Wrapper';
import { fetchProductDetails } from '@/utils/api';
// import Image from 'next/image';
// import { CiShoppingCart } from 'react-icons/ci';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetchProductDetails(params.id);
  console.log(response);
  return (
    <div className='min-h-screen bg-[#F4F4F4] font-montserrat'>
      <Navbar />
      Cart Page
      {/* <div className='min-h-[calc(100vh-80px)] flex flex-col items-center justify-center '>
        <Wrapper>
          <div className='grid grid-cols-2 md:gap-10 gap-4 mx-20'>
            <div className='w-full flex justify-center items-center h-auto bg-white w-[400px] h-[400px] rounded-[8px] shadow-sm border border-black/10'>
              <Image
                width={250}
                height={250}
                src={response.image}
                alt={response.title}
                className='w-[250px] h-[250px] my-5'
              />
            </div>

            <div className='flex flex-col justify-between'>
              <div>
                <h3 className='text-[36px] font-bold leading-10'>
                  {response.title}
                </h3>
                <div className='flex items-center justify-between'>
                  <h2 className='font-semibold font-montserrat text-[24px] mt-2'>
                    ${response.price}
                  </h2>
                  <h2 className='font-semibold font-montserrat text-[24px] mt-2'>
                    {response.rating.rate}/<span className='text-[20px]'>5</span>
                  </h2>
                </div>
                <p className='text-[#7C7A7A] text-[16px] mt-4 font-montserrat'>
                  {response.description.toLowerCase()}
                </p>
                <p className='text-[16px] bg-black/90 w-fit py-1 px-2 rounded-[4px] text-white font-semibold mt-4 font-montserrat'>
                  {response.category}
                </p>
              </div>
              <div className='bg-black text-white rounded-[8px] text-center px-4 py-2.5 cursor-pointer font-bold'>
                ADD TO CART
              </div>
            </div>
          </div>
        </Wrapper>
      </div> */}
    </div>
  );
}
