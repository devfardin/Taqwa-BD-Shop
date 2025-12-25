import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import wooRequest from '../../apis/wooAPI';
import { toast } from 'react-toastify';
import Container from '../../components/Shared/Container';
import ProductCard from '../../components/Shared/ProductCard';
import Loader from '../../components/Shared/Loader';
import SectionTitle from '../../components/Shared/SectionTitle';
import CategorySlider from '../../components/CategorySlider';
import { useSearchParams } from "react-router";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const CategoryProducts = () => {
  const { slug } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');
     const [totalPages, setTotalPages] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true)
    const categories = async (numberPage) => {
      try {
        const response = await wooRequest((`/products/categories?slug=${slug}`));
        const products = await wooRequest((`/products?category=${response.data[0]?.id}&per_page=10&page=${numberPage}`));
        setCategories(products?.data);
        setCategoryName(response?.data[0]?.name);
        setTotalPages(Math.ceil(products?.headers?.['x-wp-total'] / 10) || 1);
        setLoading(false)
      } catch (error) {
        toast.error('Error fetching category products');
        console.error("Error fetching category products:", error);
      }
    }
    categories(page);
  }, [slug, page])
  if (loading) return <Loader />;
  return (
    <Container>
      <div>
        <CategorySlider />
      </div>
      <div className="my-4">
        <SectionTitle title='Category:' highlight={categoryName} lable='Shop' to='/shop' />
      </div>
      <div className="grid 2xl:grid-cols-5  xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {categories?.map((categorie) => (
          <ProductCard product={categorie} />
        ))}
      </div>
      {
        categories.length >= 10 && 
        <div className=" mt-10 flex justify-center items-center">
        <div className="inline-flex justify-center items-center space-x-0.5 border border-gray-300 rounded">
          <button
            disabled={page === 1 || categories.length === 0}
            onClick={() => setSearchParams({ page: page - 1 })}
            className={`px-3 py-2 font-medium transition-all duration-200 rounded-l ${page === 1 || categories.length === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-btndangerbg active:bg-primary'
              }`}
          >
            <GrFormPrevious className="text-lg" />
          </button>

          <div className="flex items-center">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setSearchParams({ page: pageNum })}
                  disabled={categories.length === 0}
                  className={`w-8 h-8 font-medium transition-all duration-200 ${page === pageNum
                    ? 'bg-primary text-white'
                    : categories.length === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            disabled={page === totalPages || categories.length === 0}
            onClick={() => setSearchParams({ page: page + 1 })}
            className={`px-3 py-2 font-medium transition-all duration-200 rounded-r ${page === totalPages || categories.length === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-btndangerbg active:bg-primary'
              }`}
          >
            <GrFormNext className="text-lg" />
          </button>
        </div>
      </div>
      }
      

    </Container>
  )
}

export default CategoryProducts
