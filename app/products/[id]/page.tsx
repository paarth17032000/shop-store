import Image from 'next/image';
import Wrapper from '@/components/Wrapper';
import { fetchProductDetails } from '@/utils/api';
import AddToCardButton from '@/components/Button/AddToCardButton';
import { PiCurrencyDollarSimple } from 'react-icons/pi';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa';
import Link from 'next/link';
import CartButtonIcon from '@/components/CartButtonIcon';


export default async function Page({ params }: { params: { id: string } }) {
  const response = await fetchProductDetails(params.id);

  return (
    <div className='min-h-screen bg-white font-montserrat py-5 flex flex-col'>
      {/* Header Section */}
      <Wrapper>
        <div className='flex items-center justify-between mb-4'>
          <Link href={'/'}>
            <MdOutlineArrowBackIos size={28} />
          </Link>

          <div className='flex items-center gap-4'>
            <FaRegHeart size={28} className='md:hidden block' />
            <CartButtonIcon />
          </div>
        </div>
      </Wrapper>

      {/* Centered Content Section */}
      <div className='flex-1 flex items-center justify-center'>
        <Wrapper>
          <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-4 lg:mx-20'>
            {/* Image Gallery */}
            <div className='flex flex-col gap-5'>
              <div className='w-full flex justify-center items-center h-auto md:w-[400px] md:h-[400px] h-[300px] rounded-[8px]'>
                <Image
                  width={250}
                  height={230}
                  src={response.image}
                  alt={response.title}
                  className='md:w-[250px] w-[250px] md:h-[250px] h-[230px] my-5'
                />
              </div>
              <div className='flex overflow-x-auto no-scrollbar gap-4 w-full md:w-[350px] lg:w-[450px] '>
                {new Array(6).fill(null).map((_, index) => (
                  <div
                    key={index}
                    className='flex-shrink-0 flex justify-center items-center cursor-pointer border-2 border-grey-400 hover:border-black/70 transition duration-200 linear h-[60px] md:w-[120px] md:h-[120px] w-[60px] rounded-[8px] mt-5'
                  >
                    <Image
                      width={100}
                      height={100}
                      src={response.image}
                      alt={response.title}
                      className='md:w-[80px] w-[40px] md:h-[80px] h-[40px] my-5'
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className='flex flex-col justify-between mt-4'>
              <div>
                <div className='flex items-start justify-between'>
                  <h3 className='text-[20px] w-[70%] lg:text-[36px] font-montserrat font-extrabold lg:leading-10 leading-7'>
                    {response.title}
                  </h3>
                  <h2 className='flex items-center font-medium font-montserrat text-[20px] lg:text-[24px]'>
                    <PiCurrencyDollarSimple />
                    {response.price}
                  </h2>
                </div>
                <hr className='my-3 bg-black/30' />
                <p className='text-[#7C7A7A] lg:text-[16px] text-[14px] font-montserrat capitalize'>
                  {response.description.toLowerCase()}
                </p>
                <hr className='my-3 bg-black/30' />
              </div>
              <AddToCardButton product={response} className='mt-12' />
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
}

// import Image from 'next/image';
// import Wrapper from '@/components/Wrapper';
// import { fetchProductDetails } from '@/utils/api';
// import AddToCardButton from '@/components/Button/AddToCardButton';
// import { PiCurrencyDollarSimple } from 'react-icons/pi';
// import { MdOutlineArrowBackIos } from 'react-icons/md';
// import { FaRegHeart } from 'react-icons/fa';
// import Link from 'next/link';
// import CartButtonIcon from '@/components/CartButtonIcon';

// export default async function Page({ params }: { params: { id: string } }) {
//   const response = await fetchProductDetails(params.id);

//   return (
//     <div className='min-h-screen bg-white font-montserrat py-5 flex flex-col'>
//       {/* Header Section */}
//       <Wrapper>
//         <div className='flex items-center justify-between mb-4'>
//           <Link href={'/'}>
//             <MdOutlineArrowBackIos size={28} />
//           </Link>

//           <div className='flex items-center gap-4'>
//             <FaRegHeart size={28} className='md:hidden block' />
//             <CartButtonIcon />
//           </div>
//         </div>
//       </Wrapper>

//       {/* Centered Content Section */}
//       <div className='flex-1 flex items-center justify-center'>
//         <Wrapper>
//           <div className='grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-4 md:mx-20'>
//             {/* Image Gallery */}
//             <div className='flex flex-col gap-5'>
//               <div className='w-full flex justify-center items-center h-auto md:w-[400px] md:h-[400px] h-[300px] rounded-[8px]'>
//                 <Image
//                   width={250}
//                   height={230}
//                   src={response.image}
//                   alt={response.title}
//                   className='md:w-[250px] w-[250px] md:h-[250px] h-[230px] my-5'
//                 />
//               </div>
//               <div className='flex overflow-x-auto no-scrollbar gap-4 w-full md:w-[450px]'>
//                 {new Array(6).fill(null).map((_, index) => (
//                   <div
//                     key={index}
//                     className='flex-shrink-0 flex justify-center items-center cursor-pointer border-2 border-grey-400 hover:border-black/70 transition duration-200 linear h-[60px] md:w-[120px] md:h-[120px] w-[60px] rounded-[8px] mt-5'
//                   >
//                     <Image
//                       width={100}
//                       height={100}
//                       src={response.image}
//                       alt={response.title}
//                       className='md:w-[80px] w-[40px] md:h-[80px] h-[40px] my-5'
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Product Details */}
//             <div className='flex flex-col justify-between mt-4'>
//               <div>
//                 <div className='flex items-start justify-between'>
//                   <h3 className='text-[20px] w-[70%] lg:text-[36px] font-montserrat font-extrabold lg:leading-10 leading-7'>
//                     {response.title}
//                   </h3>
//                   <h2 className='flex items-center font-medium font-montserrat text-[20px] lg:text-[24px]'>
//                     <PiCurrencyDollarSimple />
//                     {response.price}
//                   </h2>
//                 </div>
//                 <hr className='my-3 bg-black/30' />
//                 <p className='text-[#7C7A7A] lg:text-[16px] text-[14px] font-montserrat capitalize'>
//                   {response.description.toLowerCase()}
//                 </p>
//                 <hr className='my-3 bg-black/30' />
//               </div>
//               <AddToCardButton product={response} className='mt-12' />
//             </div>
//           </div>
//         </Wrapper>
//       </div>
//     </div>
//   );
// }

