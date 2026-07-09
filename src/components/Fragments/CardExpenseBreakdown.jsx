import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";

function CardExpenseBreakdown(props) {
  const { data, loading = false, title = "Expenses Breakdown" } = props;

  return (
    <>
      <Card
        title={title}
        				desc={
          loading ? (
            <div className="min-h-[320px] flex flex-col justify-center items-center text-primary">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              <span className="mt-3">Loading Data</span>
            </div>
          ) : data.length === 0 ? (
            <div className="min-h-[220px] flex items-center justify-center text-gray-03">
              Belum ada data expenses.
            </div>
          ) : (
            <div className="h-full md:grid md:grid-cols-3 gap-4">
              {data.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex">
                    <div>
                      <div className="bg-special-bg text-gray-02 px-3 py-5 rounded-lg flex flex-col place-content-center">
                        {item.icon}
                      </div>
                    </div>
                    <div className="ms-4">
                      <span className="text-gray-02">{item.category}</span>
                      <br />
                      <span className="font-bold text-lg">${item.amount}</span>
                      <div className="flex">
                        <span className="text-gray-02">{item.percentage}%*</span>{" "}
                        {item.arrow}
                      </div>
                    </div>
                  </div>
                  <div className="flex place-content-center flex-col me-8 text-gray-02">
                    <Icon.ArrowRight size={24} color="#747474" />
                  </div>
                </div>
              ))}
            </div>
          )
        }
      />
    </>
  );
}

export default CardExpenseBreakdown;
