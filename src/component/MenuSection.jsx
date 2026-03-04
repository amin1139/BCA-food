import React, { useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';
import { IMG_URL } from '../utils/constant';
import MenuIteam from './MenuIteam';

const MenuSection = ({ menuList}) => {
  const [openId, setOpenId] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenId((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <>
      {menuList.map((menu) => {
        const hasSubCategory = menu?.categories;
        const hasItem = menu?.itemCards;

        return (
          <div
            key={menu?.categoryId}
            className="border-b border-gray-200 last:border-b-0 dark:border-slate-700"
          >
            <button
              onClick={() => toggleCategory(menu?.categoryId)}
              className="w-full flex items-center justify-between py-5 hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">
                {menu?.title} (
                {menu?.itemCards?.length ||
                  `Sub ${menu?.categories?.length}`}
                )
              </h3>

              <ChevronDown
                className={`transition-transform duration-300 ${
                  openId === menu?.categoryId ? 'rotate-180' : ''
                }`}
                size={24}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openId === menu.categoryId
                  ? 'max-h-1000 opacity-100 translate-y-0'
                  : 'max-h-0 opacity-0 -translate-y-2'
              }`}
            >
              {hasSubCategory && (
                <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-slate-700">
                  <MenuSection
                    menuList={menu.categories}
                  />
                </div>
              )}

              <div className="pt-4 pb-6 space-y-6 pl-4 border-l-2 border-gray-200 dark:border-slate-700">
                {hasItem && (
                  <MenuIteam
                    itemCards={menu.itemCards}
                    IMG_URL={IMG_URL}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default memo(MenuSection);