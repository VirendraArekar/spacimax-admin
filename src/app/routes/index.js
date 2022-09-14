import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "../containers/dashboard";
import FAQPage from "../containers/faq";
import ReportsPage from "../containers/reports";
import SchedulerPage from "../containers/scheduler";
import SitesPage from "../containers/sites";
import SiteDetailPage from "../containers/sites/detail";
import SiteFixedRoasterPage from "../containers/sites/detail/FixedRoaster/FixedRoaster";
import SiteDataPage from "../containers/sites/detail/SitesData";
import LoginPage from "../containers/login";
import SchedulerLogin from "../containers/scheduler/login";
import ProtectedWrapper from "../layout/ProtectedWrapper";
import TimesheetPage from "../containers/timesheet";
import TimesheetResultPage from "../containers/timesheet/result";
import EditFixedRoster from "../containers/sites/detail/FixedRoaster/EditFixedRoster";
import SitesOverviewPage from "../containers/sites/detail/Overview";
import SiteSettingsPage from "../containers/sites/SiteSetting";
import ViewAdvertisedShiftsPage from "../containers/scheduler/ViewAdvertisedShifts";
import CreateAlarmResponse from "../containers/scheduler/CreateAlarmResponse";
import CasualShiftsPage from "../containers/scheduler/CasualShift";
import UserLicensePage from "../containers/user/license";
import TrackerPage from "../containers/tracker";
import SupportPage from "../containers/support";
import NotificationPage from "../containers/notification";
import PortfolioReportPage from "../containers/reports/portfolio";
import ShiftReportPage from "../containers/reports/shift";
import IncidentReportPage from "../containers/reports/incident";
import CreateRoasterPage from "../containers/sites/detail/FixedRoaster/CreateRoaster";
import SiteDocumentPage from "../containers/sites/document";
import SiteInspectionPage from "../containers/sites/inspection";
import SiteFormPage from "../containers/sites/form";
import SiteTeamPage from "../containers/sites/team";
import CustomReportPage from "../containers/reports/custom";
import TipPage from "../containers/tip";
import AlertPage from "../containers/alert";
import SiteViewPage from "../containers/sites/view";
import AddTask from "../containers/tasks/addTask";
import TaskList from "../containers/tasks/taskList";
import UserList from "../containers/users";
import AddUser from "../containers/users/addUser";
import Guards from "../containers/guards";
import FaqQuestion from "../containers/faq/question";
import FaqDetail from "../containers/faq/detail";

function PageRoutes() {
  const [siteId, setSiteId] = React.useState("");

  const handleSiteId = (id) => {
    setSiteId(id)
  }
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedWrapper>
            <DashboardPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites"
        element={
          <ProtectedWrapper>
            <SitesPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId/site-view-fixed-roaster"
        element={
          <ProtectedWrapper>
            <SiteViewPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId/fixed-roaster"
        element={
          <ProtectedWrapper>
            <SiteFixedRoasterPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId/site-data"
        element={
          <ProtectedWrapper>
            <SiteDataPage />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/sites/:siteId/overview"
        element={
          <ProtectedWrapper>
            <SitesOverviewPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId/edit-fixed-roaster"
        element={
          <ProtectedWrapper>
            <EditFixedRoster />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId/fixed-roaster/create-fixed-roaster"
        element={
          <ProtectedWrapper>
            <CreateRoasterPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId/setting"
        element={
          <ProtectedWrapper>
            <SiteSettingsPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId/documents"
        element={
          <ProtectedWrapper>
            <SiteDocumentPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId/inspection"
        element={
          <ProtectedWrapper>
            <SiteInspectionPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId/inspection/form/:id"
        element={
          <ProtectedWrapper>
            <SiteFormPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId/team"
        element={
          <ProtectedWrapper>
            <SiteTeamPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/sites/:siteId"
        element={
          <ProtectedWrapper>
            <SiteDetailPage />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedWrapper>
            <ReportsPage />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/faq"
        element={
          <ProtectedWrapper>
            <FAQPage />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/faq/:faqId"
        element={
          <ProtectedWrapper>
            <FaqDetail />
          </ProtectedWrapper>
        }
      />
      
      <Route
        path="/faq/frequently-asked-questions"
        element={
          <ProtectedWrapper>
            <FaqQuestion />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/scheduler"
        element={
          <ProtectedWrapper>
            <SchedulerPage />
          </ProtectedWrapper>
        }
      />
      <Route path="/scheduler-login" element={<SchedulerLogin />} />

      <Route
        path="/scheduler/view-advertised-shifts"
        element={
          <ProtectedWrapper>
            <ViewAdvertisedShiftsPage />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/scheduler/casual-shifts"
        element={
          <ProtectedWrapper>
            <CasualShiftsPage />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedWrapper>
            <UserList />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/guards"
        element={
          <ProtectedWrapper>
            <Guards />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/users/create"
        element={
          <ProtectedWrapper>
            <AddUser />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/timesheets"
        element={
          <ProtectedWrapper>
            <TimesheetPage onHandler={handleSiteId}/>
          </ProtectedWrapper>
        }
      />
      <Route
        path="/timesheets/result"
        element={
          <ProtectedWrapper>
            <TimesheetResultPage siteId={siteId}/>
          </ProtectedWrapper>
        }
      />
      <Route
        path="/scheduler/create-alarm-response"
        element={
          <ProtectedWrapper>
            <CreateAlarmResponse />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/users/license"
        element={
          <ProtectedWrapper>
            <UserLicensePage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/trackers"
        element={
          <ProtectedWrapper>
            <TrackerPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/supports"
        element={
          <ProtectedWrapper>
            <SupportPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedWrapper>
            <NotificationPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/portfolio/reports"
        element={
          <ProtectedWrapper>
            <PortfolioReportPage />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/shift/reports"
        element={
          <ProtectedWrapper>
            <ShiftReportPage />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/incident/reports"
        element={
          <ProtectedWrapper>
            <IncidentReportPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/supports"
        element={
          <ProtectedWrapper>
            <SupportPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/trackers"
        element={
          <ProtectedWrapper>
            <TrackerPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/custom/reports"
        element={
          <ProtectedWrapper>
            <CustomReportPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/scheduler/create-alarm-response"
        element={
          <ProtectedWrapper>
            <CreateAlarmResponse />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/safety-tips"
        element={
          <ProtectedWrapper>
            <TipPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/alert-information"
        element={
          <ProtectedWrapper>
            <AlertPage />
          </ProtectedWrapper>
        }
      />

      <Route
        path="/tasks/create"
        element={
          <ProtectedWrapper>
            <AddTask />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/tasks/list"
        element={
          <ProtectedWrapper>
            <TaskList />
          </ProtectedWrapper>
        }
      />
    </Routes>
  );
}

export default PageRoutes;
