import { FaCalendar, FaFilter } from 'react-icons/fa';

const Filter = ({ dateRange, onDateRangeChange, showExpenses, onShowExpensesChange, selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center">
          <FaCalendar className="mr-2 text-gray-600" />
          <input
            type="month"
            name="start"
            value={dateRange.start}
            onChange={onDateRangeChange}
            className="border rounded p-2 text-gray-700"
          />
          <span className="mx-2">to</span>
          <input
            type="month"
            name="end"
            value={dateRange.end}
            onChange={onDateRangeChange}
            className="border rounded p-2 text-gray-700"
          />
        </div>
        
        <div className="flex items-center">
          <FaFilter className="mr-2 text-gray-600" />
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showExpenses}
              onChange={onShowExpensesChange}
              className="mr-2"
            />
            Show Expenses
          </label>
        </div>

        <div className="flex items-center">
          <label htmlFor="category" className="mr-2">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={onCategoryChange}
            className="border rounded p-2 text-gray-700"
          >
            <option value="all">All Categories</option>
            <option value="product">Product</option>
            <option value="service">Service</option>
            <option value="subscription">Subscription</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
