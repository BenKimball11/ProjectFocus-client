import React from "react";
import { Route } from "react-router-dom";
import { LotProvider } from "./lot/LotProvider";
import { LotNoteProvider } from "./note/LotNoteProvider";
import { ProjectNoteProvider } from "./note/ProjectNoteProvider";
import { ProjectProvider } from "./project/ProjectProvider";
import { ProjectDetail } from "./project/ProjectDetail";
import { LotList } from "./lot/LotList";
import { LotDetail } from "./lot/LotDetail";
import { LotForm } from "./lot/LotForm";
import { ProjectForm } from "./project/ProjectForm";
import { LotNoteForm } from "./note/LotNoteForm";
import { ProjectNoteForm } from "./note/ProjectNoteForm";

export const ApplicationViews = () => {
  return (
    <>
      <LotProvider>
        <LotNoteProvider>
        <ProjectNoteProvider>
          <ProjectProvider>
          

          <Route exact path="/lots/:lotId(\d+)">
            <LotDetail />
          </Route>
          <Route exact path="/projects/:projectId(\d+)">
            <ProjectDetail />
          </Route>
          <Route exact path="/lots/create">
            <LotForm />
          </Route>

          <Route exact path="/lots">
            <LotList />
          </Route>
          <Route exact path="/projects/create/:lotId(\d+)">
            <ProjectForm />
          </Route>
          <Route exact path="/projects/edit/:projectId(\d+)">
            <ProjectForm />
          </Route>

          <Route exact path="/lots/edit/:lotId(\d+)">          
             {/* the (/d+) means to only capture if its a decimal  */}
            <LotForm />
          </Route>



          <Route exact path="/lotnotes/create/:lotId(\d+)">
            <LotNoteForm />
          </Route>

          <Route path="/lotnotes/edit/:lotNoteId(\d+)">
            <LotNoteForm />
          </Route>

          <Route exact path="/projectnotes/create/:projectId(\d+)">
            <ProjectNoteForm />
          </Route>
          <Route path="/projectnotes/edit/:projectNoteId(\d+)">
            <ProjectNoteForm />
          </Route>
          
          </ProjectProvider>
        </ProjectNoteProvider>
        </LotNoteProvider>
      </LotProvider>
    </>
  );
};