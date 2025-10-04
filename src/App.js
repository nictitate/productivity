import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
import './App.css';
import './styles/app-unified.css';
import {Pomodoro} from "./pomodoro/Index"
import { Disclosure} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Calculator from './calculator/Calculator';
import AgeCalculator from './age/Age';
import UnitConverter from './unitconvertor/UnitConverter';
import TodoApp from './todo/TodoApp';
import ICSViewer from './icsviewer/ICSViewer';
import EncoderDecoder from './encoderdecoder/EncoderDecoder';
import ImageToBase64 from './img2base64/ImageToBase64';

const BASENAME = '/productivity';
const navigation = [
  { name: 'Pomodoro', path: '/pomodoro' },
  { name: 'Calculator', path: '/calculator' },
  { name: 'Age Calculator', path: '/age' },
  { name: 'Unit Converter', path: '/unitconverter' },
  { name: 'Todo', path: '/todo' },
  { name: 'ICS Viewer', path: '/icsviewer' },
  { name: 'Encoder/Decoder', path: '/encoderdecoder' },
  { name: 'Image to Base64', path: '/img2base64' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function App() {
  return (
    <Router basename={BASENAME}>
      <AppWithRouter/>
    </Router>
  );
}

function AppWithRouter() {
  const location = useLocation();
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <span className="text-white text-2xl font-bold mr-8">Productivity</span>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => {
                        // Active if pathname matches, or if home ("/") and Pomodoro
                        const isActive = location.pathname === item.path || (item.path === '/pomodoro' && location.pathname === '/');
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={classNames(
                              isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.path || (item.path === '/pomodoro' && location.pathname === '/');
                  return (
                    <Disclosure.Button
                      key={item.name}
                      as={Link}
                      to={item.path}
                      className={classNames(
                        isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  );
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Routes>
        <Route exact path="/" element={<Pomodoro/>}/>
        <Route exact path="/pomodoro" element={<Pomodoro/>}/>
        <Route exact path="/calculator" element={<Calculator/>}/>
        <Route exact path="/age" element={<AgeCalculator/>}/>
        <Route exact path="/unitconverter" element={<UnitConverter/>}/>
        <Route exact path="/todo" element={<TodoApp/>}/>
        <Route exact path="/icsviewer" element={<ICSViewer/>}/>
        <Route exact path="/encoderdecoder" element={<EncoderDecoder/>}/>
        <Route exact path="/img2base64" element={<ImageToBase64/>}/>
      </Routes>
    </>
  );
}
