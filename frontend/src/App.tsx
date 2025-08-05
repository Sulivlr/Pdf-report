import { Routes } from 'react-router-dom';
import Layout from '../src/features/UI/Layout/Layout';
import { Route } from 'react-router';
import DatesView from './features/components/DatesView/DatesView';
import FolderContent from './features/components/FileView/FileView';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/folders" element={<FolderContent />} />
          <Route path="/date" element={<DatesView />} />
          <Route path="/folders/:folderId" element={<FolderContent />} />
          <Route path="*" element={<h1>NOT FOUND!</h1>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
