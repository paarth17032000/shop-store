import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Wrapper from '@/components/Wrapper';
import { fetchProductDetails } from '@/utils/api';
import AddToCardButton from '@/components/Button/AddToCardButton';

export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetchProductDetails(params.id);
  return (
    <div className='min-h-screen bg-[#F4F4F4] font-montserrat'>
      <Navbar />
      <div className='min-h-[calc(100vh-80px)] flex flex-col items-center justify-center '>
        <Wrapper>
          <div className='grid lg:grid-cols-2 grid-cols-1 md:gap-10 gap-4 md:mx-20'>
            <div className='w-full flex justify-center items-center h-auto bg-white md:w-[400px] md:h-[400px] h-[300px] rounded-[8px] shadow-sm border border-black/10'>
              <Image
                width={250}
                height={250}
                src={response.image}
                alt={response.title}
                className='md:w-[250px] w-[175px] md:h-[250px] h-[200px] my-5'
              />
            </div>

            <div className='flex flex-col justify-between'>
              <div>
                <h3 className='text-[24px] lg:text-[36px] font-bold lg:leading-10 leading-8'>
                  {response.title}
                </h3>
                <div className='flex items-center justify-between'>
                  <h2 className='font-semibold font-montserrat text-[20px] lg:text-[24px] mt-2'>
                    ${response.price}
                  </h2>
                  <h2 className='font-semibold font-montserrat lg:text-[24px]  text-[20px] mt-2'>
                    {response.rating.rate}/<span className='lg:text-[20px]  text-[16px]'>5</span>
                  </h2>
                </div>
                <p className='text-[#7C7A7A] lg:text-[16px] text-[14px] mt-4 font-montserrat capitalize'>
                  {response.description.toLowerCase()}
                </p>
                <p className='text-[16px] bg-black/90 w-fit py-1 px-2 rounded-[4px] text-white font-semibold mt-4 font-montserrat'>
                  {response.category}
                </p>
              </div>
              <AddToCardButton product={response} />
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
