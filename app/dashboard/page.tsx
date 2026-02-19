import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "next/form";
import { createIssue } from "@/lib/create-issue";
import prisma from "@/lib/prisma";

export default async function Page() {
  //add proxt.ts and have authencticed check there

  const authenticated = await getServerSession(authOptions);
  if (!authenticated) {
    return redirect("/");
  }
  //add the logic to user to be add to submi the form for creating a new
  //issue and saving into database

  //excude things such as id , othering that we don't need here
  const data = await prisma.issues.findMany();
  return (
    <div className="grid grid-cols-2 gap-2 ">
      <Form action={createIssue}>
        <div className="flex flex-col gap-3 max-w-32">
          <div className="flex flex-row gap-3">
            Title
            <input name="title" className="bg-white" />
          </div>
          <div className="flex flex-row gap-3">
            Description
            <input name="description" className="bg-white" />
          </div>
          <div className="flex flex-row gap-3">
            Location
            <input name="location" className="bg-white" />
          </div>
          <div className="flex flex-row gap-3">
            Time Period
            <input name="timeperiod" className="bg-white" />
          </div>
          <div className="flex flex-row gap-3">
            label
            <input name="label" className="bg-white" />
          </div>
          <div className="flex flex-row gap-3">
            Picture
            <input name="picture" className="bg-white" />
          </div>
          <div className="flex flex-row gap-3">
            authoritiesTagged
            <input name="authoritiesTagged" className="bg-white" />
          </div>
        </div>
        {/* ... */}
        <button type="submit" className="mt-6">
          Submit Isuue
        </button>
      </Form>
      <div>
        Current Issue
        <div className="grid grid-cols-2 gap-3">
          {data.map((issue, index) => {
            return (
              <div key={index} className=" border-2 border-white p-3">
                <h1>{issue.title}</h1>
                <p> {issue.description}</p>
                <div> {issue.location}</div>
                <div>{issue.authoritiesTagged}</div>
                <div>{issue.issueTimestamp.toUTCString()}</div>
                <div className="border-2 border-amber-100">
                  Ratings
                  <div className="flex flex-row gap-3">
                    UpVote :<div>{issue.raisedUp}</div>
                    DownVoted :<div>{issue.raisedDown}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
