//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TestApi1.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Student2
    {
        public int IdStudent { get; set; }
        public string File { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<int> IdType { get; set; }
        public string IdNumber { get; set; }
        public int Career { get; set; }
        public Nullable<int> StartYear { get; set; }
    
        public virtual Career Career1 { get; set; }
        public virtual IdentificationType IdentificationType { get; set; }
    }
}
