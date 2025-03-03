import React, { useState } from 'react';
import { Calendar, Bell, Plus, X, Check, Clock, Gift, User, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for contacts and events
const mockContacts = [
  { id: 1, name: 'Emma Thompson', birthday: '1990-05-15', email: 'emma@example.com' },
  { id: 2, name: 'James Wilson', birthday: '1985-07-22', email: 'james@example.com' },
  { id: 3, name: 'Sophia Martinez', birthday: '1992-11-08', email: 'sophia@example.com' },
  { id: 4, name: 'Noah Johnson', birthday: '1988-03-30', email: 'noah@example.com' },
  { id: 5, name: 'Olivia Davis', birthday: '1995-09-12', email: 'olivia@example.com' }
];

const mockEvents = [
  { id: 1, type: 'birthday', contactId: 1, date: '2025-05-15', reminderDays: 7, autoSend: false },
  { id: 2, type: 'anniversary', contactId: 2, date: '2025-07-22', reminderDays: 3, autoSend: true },
  { id: 3, type: 'custom', contactId: 3, date: '2025-04-18', name: 'Graduation', reminderDays: 5, autoSend: false }
];

const EventReminder = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [eventType, setEventType] = useState('birthday');
  const [eventDate, setEventDate] = useState('');
  const [customEventName, setCustomEventName] = useState('');
  const [reminderDays, setReminderDays] = useState(7);
  const [autoSend, setAutoSend] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const handleAddEvent = () => {
    // In a real app, this would save the event to the database
    setShowAddEvent(false);
    // Reset form
    setSelectedContact(null);
    setEventType('birthday');
    setEventDate('');
    setCustomEventName('');
    setReminderDays(7);
    setAutoSend(false);
  };
  
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const getMonthName = (month) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
  };
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasEvent = mockEvents.some(event => event.date === date);
      
      days.push(
        <div 
          key={day} 
          className={`h-10 flex items-center justify-center rounded-full relative ${
            hasEvent ? 'bg-blue-100' : 'hover:bg-gray-100'
          } cursor-pointer`}
        >
          <span className={hasEvent ? 'font-medium text-blue-700' : ''}>{day}</span>
          {hasEvent && (
            <div className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500"></div>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  const renderUpcomingEvents = () => {
    // Sort events by date
    const sortedEvents = [...mockEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return sortedEvents.map(event => {
      const contact = mockContacts.find(c => c.id === event.contactId);
      const eventDate = new Date(event.date);
      const formattedDate = eventDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const daysUntil = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
      
      return (
        <div key={event.id} className="border rounded-lg p-4 hover:shadow-sm transition">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                event.type === 'birthday' ? 'bg-pink-100 text-pink-600' : 
                event.type === 'anniversary' ? 'bg-purple-100 text-purple-600' : 
                'bg-blue-100 text-blue-600'
              }`}>
                {event.type === 'birthday' ? (
                  <Gift size={20} />
                ) : event.type === 'anniversary' ? (
                  <CalendarDays size={20} />
                ) : (
                  <Calendar size={20} />
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  {event.type === 'custom' ? event.name : `${contact.name}'s ${event.type}`}
                </h4>
                <p className="text-sm text-gray-600">{formattedDate}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-sm font-medium ${
                daysUntil <= 7 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {daysUntil <= 0 ? 'Today!' : `${daysUntil} days left`}
              </span>
              {event.autoSend && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">
                  Auto-send
                </span>
              )}
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <User size={14} className="text-gray-400" />
              <span className="text-sm text-gray-600">{contact.name}</span>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <Bell size={16} />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                <Gift size={16} />
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell size={24} className="text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Event Reminders</h3>
        </div>
        <button
          onClick={() => setShowAddEvent(true)}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
        >
          <Plus size={16} />
          <span>Add Event</span>
        </button>
      </div>
      
      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'upcoming'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Events
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'calendar'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('calendar')}
        >
          Calendar View
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'contacts'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts
        </button>
      </div>
      
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {renderUpcomingEvents()}
        </div>
      )}
      
      {activeTab === 'calendar' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronLeft size={20} />
            </button>
            <h4 className="font-medium text-gray-800">
              {getMonthName(currentMonth)} {currentYear}
            </h4>
            <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
          
          <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <Calendar size={16} className="text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs text-blue-700">
                  Events are highlighted in blue. Click on a day to view or add events for that date.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'contacts' && (
        <div className="space-y-4">
          {mockContacts.map(contact => (
            <div key={contact.id} className="border rounded-lg p-4 hover:shadow-sm transition">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                  </div>
                </div>
                <div>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                    Add Event
                  </button>
                </div>
              </div>
              
              {contact.birthday && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center space-x-2">
                  <Gift size={14} className="text-pink-500" />
                  <span className="text-sm text-gray-600">
                    Birthday: {new Date(contact.birthday).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add New Event</h3>
              <button 
                onClick={() => setShowAddEvent(false)}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <select
                  value={selectedContact || ''}
                  onChange={(e) => setSelectedContact(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">Select a contact</option>
                  {mockContacts.map(contact => (
                    <option key={contact.id} value={contact.id}>{contact.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['birthday', 'anniversary', 'custom'].map(type => (
                    <button
                      key={type}
                      className={`py-2 rounded-lg text-sm font-medium capitalize ${
                        eventType === type
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                      onClick={() => setEventType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              {eventType === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={customEventName}
                    onChange={(e) => setCustomEventName(e.target.value)}
                    placeholder="E.g., Graduation, Job Promotion"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reminder
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Remind me</span>
                  <select
                    value={reminderDays}
                    onChange={(e) => setReminderDays(parseInt(e.target.value))}
                    className="p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    {[1, 3, 5, 7, 14, 30].map(days => (
                      <option key={days} value={days}>{days}</option>
                    ))}
                  </select>
                  <span className="text-sm text-gray-600">days before</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoSend"
                  checked={autoSend}
                  onChange={(e) => setAutoSend(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoSend" className="ml-2 block text-sm text-gray-700">
                  Automatically send a gift card on this date
                </label>
              </div>
              
              {autoSend && (
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Gift size={16} className="text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-xs text-blue-700">
                        You'll be able to configure the gift card details (amount, message, etc.) after creating this event.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddEvent(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Check size={16} />
                <span>Add Event</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <Bell size={16} className="text-blue-600" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">Never Miss an Important Date</h4>
            <p className="mt-1 text-xs text-blue-700">
              Set up reminders for birthdays, anniversaries, and other special occasions. You can even configure automatic gift card sending for your loved ones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventReminder;