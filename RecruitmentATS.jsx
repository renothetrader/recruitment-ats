import React, { useState, useMemo } from 'react';
import { Users, Briefcase, Plus, Search, Filter, Mail, Phone, Calendar, MapPin, DollarSign, Building, X, Edit2, Trash2, Eye, ChevronDown, ChevronRight, FileText, Clock, TrendingUp, Award, Target, UserCheck } from 'lucide-react';

export default function RecruitmentATS() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showJobModal, setShowJobModal] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [expandedJob, setExpandedJob] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '', company: '', location: '', type: 'Full-time', 
    salary: '', openings: 1, description: ''
  });
  const [candidateForm, setCandidateForm] = useState({
    name: '', email: '', phone: '', position: '', experience: '',
    location: '', source: 'LinkedIn'
  });

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Inc',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $160k',
      status: 'active',
      openings: 2,
      applicants: 45,
      posted: '2024-10-01',
      description: 'Looking for experienced full stack developer with React and Node.js expertise.'
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $140k',
      status: 'active',
      openings: 1,
      applicants: 32,
      posted: '2024-10-05',
      description: 'Seeking product manager to lead our core product initiatives.'
    },
    {
      id: 3,
      title: 'UX Designer',
      company: 'DesignHub',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$80k - $100k',
      status: 'closed',
      openings: 1,
      applicants: 28,
      posted: '2024-09-20',
      description: 'Contract position for experienced UX designer.'
    }
  ]);

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Full Stack Developer',
      jobId: 1,
      status: 'interview',
      experience: '8 years',
      location: 'San Francisco, CA',
      rating: 4.5,
      appliedDate: '2024-10-08',
      source: 'LinkedIn',
      notes: 'Strong technical skills, great culture fit.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      position: 'Product Manager',
      jobId: 2,
      status: 'screening',
      experience: '6 years',
      location: 'Boston, MA',
      rating: 4.0,
      appliedDate: '2024-10-10',
      source: 'Indeed',
      notes: 'Good product sense, needs to demonstrate leadership.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '+1 (555) 345-6789',
      position: 'Senior Full Stack Developer',
      jobId: 1,
      status: 'offer',
      experience: '10 years',
      location: 'San Francisco, CA',
      rating: 5.0,
      appliedDate: '2024-10-03',
      source: 'Referral',
      notes: 'Excellent candidate, preparing offer letter.'
    },
    {
      id: 4,
      name: 'David Park',
      email: 'david.park@email.com',
      phone: '+1 (555) 456-7890',
      position: 'UX Designer',
      jobId: 3,
      status: 'rejected',
      experience: '4 years',
      location: 'New York, NY',
      rating: 3.0,
      appliedDate: '2024-09-25',
      source: 'Company Website',
      notes: 'Portfolio did not meet requirements.'
    }
  ]);

  const statusColors = {
    applied: 'bg-blue-100 text-blue-700 border-blue-200',
    screening: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    interview: 'bg-purple-100 text-purple-700 border-purple-200',
    offer: 'bg-green-100 text-green-700 border-green-200',
    hired: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    rejected: 'bg-red-100 text-red-700 border-red-200'
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           c.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [candidates, searchTerm, filterStatus]);

  const stageCounts = useMemo(() => {
    const counts = { applied: 0, screening: 0, interview: 0, offer: 0, hired: 0 };
    candidates.forEach(c => {
      if (counts[c.status] !== undefined) counts[c.status]++;
    });
    return counts;
  }, [candidates]);

  const stats = useMemo(() => ({
    totalJobs: jobs.filter(j => j.status === 'active').length,
    totalCandidates: candidates.length,
    activeInterviews: candidates.filter(c => c.status === 'interview').length,
    offersExtended: candidates.filter(c => c.status === 'offer').length
  }), [jobs, candidates]);

  const updateCandidateStatus = (candidateId, newStatus) => {
    setCandidates(candidates.map(c => 
      c.id === candidateId ? { ...c, status: newStatus } : c
    ));
  };

  const addJob = () => {
    if (!jobForm.title || !jobForm.company) return;
    const newJob = {
      id: jobs.length + 1,
      ...jobForm,
      status: 'active',
      applicants: 0,
      posted: new Date().toISOString().split('T')[0]
    };
    setJobs([...jobs, newJob]);
    setShowJobModal(false);
    setJobForm({ title: '', company: '', location: '', type: 'Full-time', salary: '', openings: 1, description: '' });
  };

  const addCandidate = () => {
    if (!candidateForm.name || !candidateForm.email) return;
    const newCandidate = {
      id: candidates.length + 1,
      ...candidateForm,
      status: 'applied',
      rating: 0,
      appliedDate: new Date().toISOString().split('T')[0],
      jobId: null,
      notes: ''
    };
    setCandidates([...candidates, newCandidate]);
    setShowCandidateModal(false);
    setCandidateForm({ name: '', email: '', phone: '', position: '', experience: '', location: '', source: 'LinkedIn' });
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  const deleteCandidate = (id) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  // ...Component and Render JSX (StatCard, Dashboard, Jobs, Candidates, etc.) ...
  // [Copy all render logic from your original code—do not leave out any subcomponents.]

  // At the end:
  // return (
  //   ... [your entire application layout and modal rendering here] ...
  // );
}
