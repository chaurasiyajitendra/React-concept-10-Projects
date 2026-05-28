import { useMemo, useState } from "react";
import {
  Wallet,
  IndianRupee,
  Home,
  Car,
  Utensils,
  Gamepad2,
  PiggyBank,
} from "lucide-react";

const PersonalFinance = () => {

  const [salary, setSalary] = useState(50000);

  // Expense Categories
  const expenses = useMemo(() => {
    return [
      {
        title: "Rent",
        amount: salary * 0.3,
        icon: <Home size={22} />,
      },
      {
        title: "Food",
        amount: salary * 0.15,
        icon: <Utensils size={22} />,
      },
      {
        title: "Travel",
        amount: salary * 0.1,
        icon: <Car size={22} />,
      },
      {
        title: "Entertainment",
        amount: salary * 0.08,
        icon: <Gamepad2 size={22} />,
      },
      {
        title: "Savings",
        amount: salary * 0.2,
        icon: <PiggyBank size={22} />,
      },
    ];
  }, [salary]);

  // Total Expense
  const totalExpense = expenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  // Remaining Balance
  const remaining = salary - totalExpense;

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-white p-6">
      
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        
        {/* Heading */}
        <div className="mb-8">
          
          <h1 className="text-5xl font-bold mb-2">
            Finance Dashboard
          </h1>

          <p className="text-slate-400">
            Track your salary and monthly expenses
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-[380px_1fr] gap-6 flex-1 overflow-hidden">
          
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-6">
            
            {/* Salary Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              
              <div className="flex items-center gap-3 mb-6">
                
                <div className="bg-slate-800 p-3 rounded-2xl">
                  <Wallet size={24} />
                </div>

                <h2 className="text-2xl font-semibold">
                  Monthly Salary
                </h2>
              </div>

              <input
                type="number"
                value={salary}
                onChange={(e) =>
                  setSalary(Number(e.target.value))
                }
                placeholder="Enter salary"
                className="w-full bg-slate-800 border border-slate-700 px-4 py-4 rounded-2xl outline-none focus:border-white text-xl"
              />

              <div className="mt-6 bg-slate-800 rounded-2xl p-5">
                
                <p className="text-slate-400 mb-2">
                  Remaining Balance
                </p>

                <h2 className="text-4xl font-bold text-green-400">
                  ₹ {remaining.toFixed(0)}
                </h2>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              
              <h2 className="text-2xl font-semibold mb-6">
                Monthly Summary
              </h2>

              <div className="flex flex-col gap-5">
                
                <div className="flex items-center justify-between">
                  <p className="text-slate-400">
                    Income
                  </p>

                  <h3 className="text-green-400 text-xl font-bold">
                    ₹ {salary}
                  </h3>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-slate-400">
                    Expenses
                  </p>

                  <h3 className="text-red-400 text-xl font-bold">
                    ₹ {totalExpense.toFixed(0)}
                  </h3>
                </div>

                <div className="h-[1px] bg-slate-800" />

                <div className="flex items-center justify-between">
                  <p className="text-slate-400">
                    Savings
                  </p>

                  <h3 className="text-cyan-400 text-xl font-bold">
                    ₹ {remaining.toFixed(0)}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="overflow-y-auto pr-2 flex flex-col gap-6 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            
            {/* Expense Chart */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              
              <h2 className="text-3xl font-bold mb-8">
                Expense Breakdown
              </h2>

              <div className="flex flex-col gap-6">
                
                {expenses.map((item, index) => {

                  const percentage =
                    (item.amount / salary) * 100;

                  return (
                    <div key={index}>
                      
                      {/* Top */}
                      <div className="flex items-center justify-between mb-3">
                        
                        <div className="flex items-center gap-3">
                          
                          <div className="bg-slate-800 p-3 rounded-2xl">
                            {item.icon}
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold">
                              {item.title}
                            </h3>

                            <p className="text-slate-400 text-sm">
                              {percentage.toFixed(0)}%
                            </p>
                          </div>
                        </div>

                        <h2 className="text-xl font-bold">
                          ₹ {item.amount.toFixed(0)}
                        </h2>
                      </div>

                      {/* Progress */}
                      <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                        
                        <div
                          style={{
                            width: `${percentage}%`,
                          }}
                          className="h-full bg-white rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-3 gap-5">
              
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                
                <div className="bg-slate-800 w-fit p-3 rounded-2xl mb-5">
                  <IndianRupee size={22} />
                </div>

                <p className="text-slate-400 mb-2">
                  Total Salary
                </p>

                <h2 className="text-3xl font-bold">
                  ₹ {salary}
                </h2>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                
                <div className="bg-slate-800 w-fit p-3 rounded-2xl mb-5">
                  <Wallet size={22} />
                </div>

                <p className="text-slate-400 mb-2">
                  Expenses
                </p>

                <h2 className="text-3xl font-bold text-red-400">
                  ₹ {totalExpense.toFixed(0)}
                </h2>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                
                <div className="bg-slate-800 w-fit p-3 rounded-2xl mb-5">
                  <PiggyBank size={22} />
                </div>

                <p className="text-slate-400 mb-2">
                  Savings
                </p>

                <h2 className="text-3xl font-bold text-green-400">
                  ₹ {remaining.toFixed(0)}
                </h2>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFinance;