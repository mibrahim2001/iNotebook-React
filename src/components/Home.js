import React from "react";
import { Notes } from "./Notes";
export const Home = () => {
  return (
    <div className="container">
      <h1>Add a note below</h1>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Your note here:
        </label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <Notes />
    </div>
  );
};
