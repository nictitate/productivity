import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './App.css';
import {Pomodoro} from "./pomodoro/Index"
import { Disclosure} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Calculator from './calculator/Calculator';
import AgeCalculator from './age/Age';
import TodoApp from './todo/TodoApp';

const navigation = [
  { name: 'Pomodoro', href: '/pomodoro', current: false },
  { name: 'Calculator', href: '/calculator', current: false },
  { name: 'Age Calculator', href: '/age', current: false },
  { name: 'Todo', href: '/todo', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  return (
    <Router>
      <AppWithRouter/>
    </Router>
  );
}

function AppWithRouter() {
  const location = useLocation();
  const updatedNavigation = navigation.map(item => ({
    ...item,
    current: item.href === location.pathname
  }));
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
                      {updatedNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {updatedNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
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
    <Route exact path="/todo" element={<TodoApp/>}/>
  </Routes>
    </>
  )
}
